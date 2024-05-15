<?php

namespace App\Http\Controllers;

use App\Models\LocTracking;
use App\Models\Site;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function dashboard()
    {
        $loc_count = Site::distinct()->count('loc_id');
        $wntd_count = Site::distinct()->count('wntd');
        $avc_count = Site::distinct()->count('avc');
        $site_count = Site::distinct()->count('site_name');
        $home_cell_count = Site::distinct()->count('home_cell');
        $traffic_profile_count = Site::where('traffic_profile', '!=', 'N')->count('traffic_profile');

        $version = Site::selectRaw('version, COUNT(wntd) as count')->groupBy('version')->get();

        $sites = Site::all();
        foreach ($sites as $site) {
            $locTrackingData = LocTracking::where('site_id', $site->id)->whereIn('key', ['status', 'solution_type'])->get()->keyBy('key')->toArray();
            $site->tracking = $locTrackingData;
        }
        $site_status = array(
            'in_progress' => array('label' => 'In Progress', 'count' => 0),
            'not_started' => array('label' => 'Not Started', 'count' => 0),
            'completed' => array('label' => 'Completed', 'count' => 0),
            'none' => array('label' => 'None', 'count' => 0)
        );
        foreach ($sites as $site) {
            if (isset($site->tracking['status']['value'])) {
                $key = $site->tracking['status']['value'];
                $site_status[$key]['count'] = $site_status[$key]['count'] + 1;
            } else {
                $site_status['none']['count'] = $site_status['none']['count'] + 1;
            }
        }
        $site_solution_type = array(
            'device_upgrade' => array('label' => 'Device Upgrade', 'count' => 0),
            'reparent' => array('label' => 'Reparent', 'count' => 0),
            'repan' => array('label' => 'Repan', 'count' => 0),
            'none' => array('label' => 'None', 'count' => 0)
        );

        foreach ($sites as $site) {
            if (isset($site->tracking['solution_type']['value'])) {
                $key = $site->tracking['solution_type']['value'];
                $site_solution_type[$key]['count'] = $site_solution_type[$key]['count'] + 1;
            } else {
                $site_solution_type['none']['count'] = $site_solution_type['none']['count'] + 1;
            }
        }

        $open_locs = Site::with('locTracking')->whereHas('locTracking', function ($query) {
            $query->where('key', 'status')->where('value', 'in_progress');
        })->take(10)->get();
        $closed_locs = Site::with('locTracking')->whereHas('locTracking', function ($query) {
            $query->where('key', 'status')->where('value', 'completed');
        })->take(10)->get();

        return Inertia::render('Dashboard', [
            'count_data' => [
                'loc_count' => $loc_count,
                'wntd_count' => $wntd_count,
                'avc_count' => $avc_count,
                'site_count' => $site_count,
                'home_cell_count' => $home_cell_count,
                'traffic_profile_count' => $traffic_profile_count
            ],
            'version' => $version,
            'site_status' => array_values($site_status),
            'site_solution_type' => array_values($site_solution_type),
            'open_locs' => $open_locs,
            'closed_locs' => $closed_locs
        ]);
    }
}
