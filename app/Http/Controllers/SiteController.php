<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessSiteFieldImport;
use App\Models\Site;
use App\Models\SiteTracking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use League\Csv\Reader;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SiteController extends Controller
{
    public function index(Request $request)
    {
        $order = $request->input('order');
        $order_by = $request->input('order_by') ? $request->input('order_by') : 'site_name';
        $search_query = $request->input('search');
        $per_page = $request->input('per_page') && strtolower($request->input('per_page')) === 'all' ? PHP_INT_MAX : ($request->input('per_page') ? $request->input('per_page') : 10);

        if ($search_query) {
            $tableName = (new Site())->getTable();
            $columns = \Schema::getColumnListing($tableName);
            $sites = Site::where(function ($query) use ($search_query, $columns) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            })->orderBy($order_by, $order ? $order : 'asc')->paginate($per_page);
        } else {
            $sites = Site::orderBy($order_by, $order ? $order : 'asc')->paginate($per_page);
        }
        $desiredKeys = ['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'];
        foreach ($sites as $site) {
            $locTrackingData = SiteTracking::where('site_area_id', $site->id)
                ->whereIn('key', $desiredKeys)
                ->get()
                ->keyBy('key')
                ->toArray();
            $site->tracking = $locTrackingData;
        }
        if ($request->input('filter_by') && $request->input('value')) {
            $filterBy = $request->input('filter_by');
            $sitesArray = $sites->items();
            $filteredSites = array_filter($sitesArray, function ($site) use ($filterBy, $request) {
                return isset($site->tracking[$filterBy]) &&
                    isset($site->tracking[$filterBy]['value']) &&
                    $site->tracking[$filterBy]['value'] === $request->input('value');
            });
            $sites->setCollection(collect($filteredSites));
        }
        return Inertia::render('SiteFieldName/Index', [
            'sites' => $sites,
            'get_data' => $request->all()
        ]);
    }

    public function save_item(Request $request)
    {
        $items = $request->items;
        foreach ($items as $key => $item) {
            $tracking = SiteTracking::create([
                'site_area_id' => $request->site_id,
                'user_id' => Auth::id(),
                'key' => $key,
                'value' => $item,
            ]);
        }
        return response()->json([
            'success' => ['message' => 'Changes saved successfully.'],
        ], 200);
    }

    public function save_artifacts(Request $request)
    {
        $paths_array = [];
        if ($request->hasFile('artifacts')) {
            $files = $request->file('artifacts');
            foreach ($files as $file) {
                $name = now()->timestamp . "_{$file->getClientOriginalName()}";
                $path = $file->storeAs('artifacts', $name, 'public');
                $paths_array[] = "/storage/{$path}";
            }
        }
        if (count($paths_array) > 0) {
            $tracking = SiteTracking::create([
                'site_area_id' => $request->site_id,
                'user_id' => Auth::id(),
                'key' => $request->field_name,
                'value' => json_encode($paths_array),
            ]);
        }
        return to_route('site.field.name.index');
    }

    public function import_from_csv(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'import_file' => 'required|file|mimes:csv',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => array('message' => $validator->errors()->first())], 500);
        }
        $file = $request->file('import_file');
        $filePath = $file->storeAs('import', now()->timestamp . "_{$file->getClientOriginalName()}");
        $csv = Reader::createFromPath(storage_path('app/' . $filePath), 'r');
        $csv->setHeaderOffset(0);
        $header = $csv->getHeader();
        return response()->json([
            'filePath' => $filePath,
            'header' => $header
        ], 200);
    }

    public function map_and_save_csv(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'site_name' => 'required',
            'cell_name' => 'required',
            'lon' => 'required',
            'lat' => 'required',
            'bb_type' => 'required',
            'rru_type' => 'required',
            'antenna_type' => 'required',
            'frequency' => 'required',
            'pci' => 'required',
            'azimuth' => 'required',
            'height' => 'required',
            'last_epo' => 'required',
            'next_epo' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => array('message' => $validator->errors()->first())], 500);
        }
        $filePath = $request->input('file_path');
        $input = $request->all();
        $csv = Reader::createFromPath(storage_path('app/' . $filePath), 'r');
        $csv->setHeaderOffset(0);
        $rows = $csv->getRecords();
        $dataFromCsv = [];
        foreach ($rows as $row) {
            $dataFromCsv[] = $row;
        }
        $dataFromCsv = array_chunk($dataFromCsv, 300);
        $batch = Bus::batch([])->dispatch();
        foreach ($dataFromCsv as $index => $dataCsv) {
            foreach ($dataCsv as $data) {
                $information[$index][] = $data;
            }
            $batch->add(new ProcessSiteFieldImport($input, $information[$index]));
        }
        session()->put('batch_field_id', $batch->id);
        return response()->json([
            'success' => ['message' => 'Sites imported successfully.'],
            'batch_id' => $batch->id,
        ], 200);
    }

    // public function location_site($id)
    // {
    //     $site = Site::where('loc_id', $id)->first();
    //     $desiredKeys = ['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'];
    //     $locTrackingData = FieldTracking::where('site_area_id', $site->id)->whereIn('key', $desiredKeys)->get()->keyBy('key')->toArray();
    //     $site->tracking = $locTrackingData;

    //     $trackings = FieldTracking::with('user')->where('site_area_id', $id)->get();
    //     return Inertia::render('Wireless/Sites/Show', [
    //         'site' => $site,
    //         'trackings' => $trackings
    //     ]);
    // }

    public function export()
    {
        set_time_limit(0);
        ini_set('memory_limit', '-1');
        $csvFileName = 'fw-sites.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
        ];
        $sites = Site::orderBy('site_name', 'asc')->get();
        $desiredKeys = ['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'];
        foreach ($sites as $site) {
            $locTrackingData = SiteTracking::where('site_area_id', $site->id)
                ->whereIn('key', $desiredKeys)
                ->get()
                ->keyBy('key')
                ->toArray();
            $site->tracking = $locTrackingData;
        }
        $callback = function () use ($sites) {
            $file = fopen('php://output', 'w');
            fputcsv(
                $file,
                array(
                    'Site Name',
                    'Cell Name',
                    'Lon',
                    'Lat',
                    'BB Type',
                    'RRU Type',
                    'Antenna Type',
                    'Frequency',
                    'PCI',
                    'Azimuth',
                    'Height',
                    'Last EPO',
                    'Next EPO',
                    'Start Date',
                    'End Date',
                    'Solution Type',
                    'Status',
                    'Remarks',
                    'Artifacts'
                )
            );
            foreach ($sites as $row) {
                fputcsv(
                    $file,
                    array(
                        $row['site_name'],
                        $row['cell_name'],
                        $row['lon'],
                        $row['lat'],
                        $row['bb_type'],
                        $row['rru_type'],
                        $row['antenna_type'],
                        $row['frequency'],
                        $row['pci'],
                        $row['azimuth'],
                        $row['height'],
                        $row['last_epo'],
                        $row['next_epo'],
                        $this->get_tracking_value($row['tracking'], 'start_date'),
                        $this->get_tracking_value($row['tracking'], 'end_date'),
                        $this->get_tracking_value($row['tracking'], 'solution_type'),
                        $this->get_tracking_value($row['tracking'], 'status'),
                        $this->get_tracking_value($row['tracking'], 'remarks'),
                        $this->get_tracking_value($row['tracking'], 'artifacts')
                    )
                );
            }
            fclose($file);
        };
        return new StreamedResponse($callback, 200, $headers);
    }

    public function get_tracking_value($items, $key)
    {
        if (array_key_exists($key, $items)) {
            $item = $items[$key];
            if (isset($item)) {
                if ($key == 'start_date' || $key == 'end_date') {
                    return Carbon::parse($item['value'])->format('d/m/Y');
                }
                return $item['value'];
            } else {
                return '';
            }
        } else {
            return '';
        }
    }
}
