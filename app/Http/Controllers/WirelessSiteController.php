<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Site;
use Inertia\Inertia;
use App\Models\LocTracking;
use Illuminate\Http\Request;
use App\Jobs\ProcessCsvImport;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class WirelessSiteController extends Controller
{
    public function index(Request $request)
    {
        $order = $request->input('order');
        $order_by = $request->input('order_by');
        $search_query = $request->input('search');
        $per_page = $request->input('per_page') && strtolower($request->input('per_page')) === 'all' ? PHP_INT_MAX : ($request->input('per_page') ? $request->input('per_page') : 10);

        if ($search_query) {
            $tableName = (new Site)->getTable();
            $columns = \Schema::getColumnListing($tableName);
            $sites = Site::where(function ($query) use ($search_query, $columns) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            })->orderBy($order_by, $order ? $order : 'asc')->paginate($per_page);
        } else {
            if ($order_by) {
                $sites = Site::orderBy($order_by, $order ? $order : 'asc')->paginate($per_page);
            } else {
                $sites = Site::paginate($per_page);
            }

        }
        $desiredKeys = ['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'];
        foreach ($sites as $site) {
            $locTrackingData = LocTracking::where('site_id', $site->id)
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
        return Inertia::render('Wireless/Sites/Index', [
            'sites' => $sites,
            'get_data' => $request->all()
        ]);
    }

    public function save_item(Request $request)
    {
        $tracking = LocTracking::create([
            'site_id' => $request->site_id,
            'loc_id' => $request->location_id,
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
            $tracking = LocTracking::create([
                'site_id' => $request->site_id,
                'loc_id' => $request->location_id,
                'user_id' => Auth::id(),
                'key' => $request->field_name,
                'value' => json_encode($paths_array),
            ]);
        }
        return to_route('wireless.sites.index');
    }

    public function location_site($id)
    {
        $site = Site::where('loc_id', $id)->first();
        $desiredKeys = ['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'];
        $locTrackingData = LocTracking::where('site_id', $site->id)->whereIn('key', $desiredKeys)->get()->keyBy('key')->toArray();
        $site->tracking = $locTrackingData;

        $trackings = LocTracking::with('user')->where('loc_id', $id)->get();
        return Inertia::render('Wireless/Sites/Show', [
            'site' => $site,
            'trackings' => $trackings
        ]);
    }
    public function import_from_csv(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'import_file' => 'required|file|mimes:csv',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => array('message' => 'Only CSV file is allowed.')], 422);
        }
        $file = $request->file('import_file');
        $filePath = $file->storeAs('import', now()->timestamp . "_{$file->getClientOriginalName()}");
        $job = new ProcessCsvImport($filePath);
        dispatch_sync($job);
        return response()->json(['success' => 'CSV file imported.'], 200);
    }
}
