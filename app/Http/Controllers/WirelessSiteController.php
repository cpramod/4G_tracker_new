<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\Site;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Location;
use Illuminate\Http\Request;

class WirelessSiteController extends Controller
{
    public function index()
    {
        $users = User::all();
        $locations = Location::all();
        $sites = Site::with([
            'location' => function ($query) {
                $query->select('id', 'name');
            },
            'user' => function ($query) {
                $query->select('id', 'name');
            }
        ])->get();
        return Inertia::render('Wireless/Sites/Index', [
            'users' => $users,
            'locations' => $locations,
            'sites' => $sites,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'status' => 'required',
            'issue' => 'required',
            'location_id' => 'required',
            'user_id' => 'required',
        ]);
        $site = Site::create([
            'name' => $request->name,
            'status' => $request->status,
            'issue' => $request->issue,
            'location_id' => $request->location_id,
            'user_id' => $request->user_id
        ]);
        if ($site) {
            return to_route('wireless.sites.index');
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'status' => 'required',
            'issue' => 'required',
            'location_id' => 'required',
            'user_id' => 'required',
        ]);
        $site = Site::find($id);
        $site->update([
            'name' => $request->name,
            'status' => $request->status,
            'issue' => $request->issue,
            'location_id' => $request->location_id,
            'user_id' => $request->user_id
        ]);
        if ($site) {
            return to_route('wireless.sites.index');
        }
    }

    public function delete($id)
    {
        $site = Site::find($id);
        $site->delete();
        return to_route('wireless.sites.index');
    }

    public function show($id)
    {
        $site = Site::with('location')->where('id', $id)->first();
        $issues = Issue::with(['user', 'comments', 'comments.user'])->where(['site_id' => $id, "status" => "open"])->get();
        return Inertia::render('Wireless/Sites/Show', [
            'site' => $site,
            'issues' => $issues
        ]);
    }
}
