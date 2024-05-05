<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Site;
use Inertia\Inertia;
use League\Csv\Reader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WirelessSiteController extends Controller
{
    public function index()
    {
        $sites = Site::latest()->paginate(10);
        return Inertia::render('Wireless/Sites/Index', [
            'sites' => $sites,
        ]);
    }

    public function save_item(Request $request, $id)
    {
        $site = Site::find($id);
        if ($site) {
            $site->update([
                $request->field_name => $request->field_value,
            ]);
        }
    }

    public function save_artifacts(Request $request, $id)
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
        $site = Site::find($id);
        if (count($paths_array) > 0) {
            $site->update([
                'artifacts' => $paths_array,
            ]);
        }
        return to_route('wireless.sites.index');
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
        $csv = Reader::createFromPath(storage_path('app/' . $filePath), 'r');
        $csv->setHeaderOffset(0);
        foreach ($csv as $row) {
            $existingLoc = Site::where('loc_id', $row['LOCID'])->first();
            if (!$existingLoc) {
                Site::create([
                    'loc_id' => $row['LOCID'],
                    'wntd' => $row['WNTD'],
                    'imsi' => $row['IMSI'],
                    'version' => $row['VERSION'],
                    'avc' => $row['AVC'],
                    'bw_profile' => $row['BW_PROFILE'],
                    'lon' => $row['LON'],
                    'lat' => $row['LAT'],
                    'site_name' => $row['SITE_NAME'],
                    'home_cell' => $row['HOME_CELL'],
                    'home_pci' => $row['HOME_PCI'],
                    'traffic_profile' => $row['TRAFFIC_PROFILE'],
                ]);
            } else {
                return response()->json([
                    'error' => array(
                        'message' => 'Site with LOCID ' . $row['LOCID'] . ' already exists',
                    )
                ], 422);
            }
        }
        return response()->json(['success' => 'Data inserted successfully'], 200);
    }

    public function search_sites(Request $request)
    {
        $search_txt = $request->input('search');
        $tableName = (new Site)->getTable();
        $columns = \Schema::getColumnListing($tableName);
        $results = Site::where(function ($query) use ($search_txt, $columns) {
            foreach ($columns as $column) {
                $query->orWhere($column, 'LIKE', '%' . $search_txt . '%');
            }
        })->get();
        return $results;
    }
}
