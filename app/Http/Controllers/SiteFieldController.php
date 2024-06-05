<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessSiteFieldImport;
use App\Models\FieldTracking;
use App\Models\LocTracking;
use App\Models\Site;
use App\Models\SiteArea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use League\Csv\Reader;

class SiteFieldController extends Controller
{
    public function index(Request $request)
    {
        $order = $request->input('order');
        $order_by = $request->input('order_by');
        $search_query = $request->input('search');
        $per_page = $request->input('per_page') && strtolower($request->input('per_page')) === 'all' ? PHP_INT_MAX : ($request->input('per_page') ? $request->input('per_page') : 10);

        if ($search_query) {
            $tableName = (new SiteArea())->getTable();
            $columns = \Schema::getColumnListing($tableName);
            $sites = SiteArea::where(function ($query) use ($search_query, $columns) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            })->orderBy($order_by, $order ? $order : 'asc')->paginate($per_page);
        } else {
            if ($order_by) {
                $sites = SiteArea::orderBy($order_by, $order ? $order : 'asc')->paginate($per_page);
            } else {
                $sites = SiteArea::paginate($per_page);
            }

        }
        $desiredKeys = ['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'];
        foreach ($sites as $site) {
            $locTrackingData = FieldTracking::where('site_area_id', $site->id)
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
        $tracking = FieldTracking::create([
            'site_area_id' => $request->site_id,
            'user_id' => Auth::id(),
            'key' => $request->field_name,
            'value' => $request->field_value,
        ]);
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
            $tracking = FieldTracking::create([
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
        $job = new ProcessSiteFieldImport($filePath);
        dispatch_sync($job);
        return response()->json(['success' => ['message' => 'Sites imported successfully.']], 200);
    }

    public function location_site($id)
    {
        $site = Site::where('loc_id', $id)->first();
        $desiredKeys = ['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'];
        $locTrackingData = FieldTracking::where('site_area_id', $site->id)->whereIn('key', $desiredKeys)->get()->keyBy('key')->toArray();
        $site->tracking = $locTrackingData;

        $trackings = FieldTracking::with('user')->where('site_area_id', $id)->get();
        return Inertia::render('Wireless/Sites/Show', [
            'site' => $site,
            'trackings' => $trackings
        ]);
    }
}
