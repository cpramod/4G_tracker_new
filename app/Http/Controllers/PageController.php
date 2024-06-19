<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\JobBatch;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Models\LocationTracking;
use Illuminate\Support\Facades\DB;


class PageController extends Controller
{
    public function dashboard()
    {
        $results = Location::selectRaw('COUNT(DISTINCT loc_id) as loc_count,COUNT(DISTINCT wntd) as wntd_count,COUNT(DISTINCT avc) as avc_count,COUNT(DISTINCT site_name) as site_count,COUNT(DISTINCT home_cell) as home_cell_count,COUNT(CASE WHEN traffic_profile != 'N' THEN 1 END) as traffic_profile_count')->first();
        $version = Location::selectRaw('version, COUNT(wntd) as count')->groupBy('version')->get();
        $site_solution_type = array(
            'device_upgrade' => array('label' => 'Device Upgrade', 'count' => 0),
            'reparent' => array('label' => 'Reparent', 'count' => 0),
            'repan' => array('label' => 'Repan', 'count' => 0),
            'none' => array('label' => 'None', 'count' => 0)
        );
        $site_status = array(
            'in_progress' => array('label' => 'In Progress', 'count' => 0),
            'not_started' => array('label' => 'Not Started', 'count' => 0),
            'completed' => array('label' => 'Completed', 'count' => 0),
            'none' => array('label' => 'None', 'count' => 0)
        );
        $sites = Location::select('locations.id', 'locations.loc_id')
            ->leftJoin('location_trackings', function ($join) {
                $join->on('locations.id', '=', 'location_trackings.site_id')->whereRaw('location_trackings.id = (SELECT MAX(id) FROM location_trackings  WHERE location_trackings.site_id = locations.id)');
            })->selectRaw(
                'locations.id,locations.loc_id,
                COALESCE(SUM(CASE WHEN location_trackings.key = "status" AND location_trackings.value = "in_progress" THEN 1 ELSE 0 END), 0) AS in_progress_count,
                COALESCE(SUM(CASE WHEN location_trackings.key = "status" AND location_trackings.value = "not_started" THEN 1 ELSE 0 END), 0) AS not_started_count,
                COALESCE(SUM(CASE WHEN location_trackings.key = "status" AND location_trackings.value = "completed" THEN 1 ELSE 0 END), 0) AS completed_count,
                COALESCE(SUM(CASE WHEN location_trackings.key = "status" THEN 0 ELSE 1 END), 0) AS none_count,
                COALESCE(SUM(CASE WHEN location_trackings.key = "solution_type" AND location_trackings.value = "device_upgrade" THEN 1 ELSE 0 END), 0) AS device_upgrade_count,
                COALESCE(SUM(CASE WHEN location_trackings.key = "solution_type" AND location_trackings.value = "reparent" THEN 1 ELSE 0 END), 0) AS reparent_count,
                COALESCE(SUM(CASE WHEN location_trackings.key = "solution_type" AND location_trackings.value = "repan" THEN 1 ELSE 0 END), 0) AS repan_count,
                COALESCE(SUM(CASE WHEN location_trackings.key = "solution_type" THEN 0 ELSE 1 END), 0) AS none_solution_type_count'
            )->groupBy('locations.id', 'locations.loc_id')->orderBy('locations.id')->get();

        foreach ($sites as $site) {
            $site_status['in_progress']['count'] += $site->in_progress_count;
            $site_status['not_started']['count'] += $site->not_started_count;
            $site_status['completed']['count'] += $site->completed_count;
            $site_status['none']['count'] += $site->none_count;
            $site_solution_type['device_upgrade']['count'] += $site->device_upgrade_count;
            $site_solution_type['reparent']['count'] += $site->reparent_count;
            $site_solution_type['repan']['count'] += $site->repan_count;
            $site_solution_type['none']['count'] += $site->none_solution_type_count;
        }
        $open_locs = Location::with('locTracking')->whereHas('locTracking', function ($query) {
            $query->where('key', 'status')->where('value', 'in_progress');
        })->take(10)->get();
        $closed_locs = Location::with('locTracking')->whereHas('locTracking', function ($query) {
            $query->where('key', 'status')->where('value', 'completed');
        })->take(10)->get();

        return Inertia::render('Dashboard', [
            'count_data' => $results,
            'version' => $version,
            'site_status' => array_values($site_status),
            'site_solution_type' => array_values($site_solution_type),
            'open_locs' => $open_locs,
            'closed_locs' => $closed_locs
        ]);
    }
    public function get_progress(Request $request)
    {
        $batchId = $request->batchId;
        if (JobBatch::where('id', $batchId)->exists()) {
            $response = JobBatch::where('id', $batchId)->first();
            if ($response->pending_jobs == 0 || $response->failed_jobs > 0) {
                session()->put('batch_field_id', '');
                session()->put('batch_site_id', '');
            }
            return response()->json($response);
        }
    }
}
