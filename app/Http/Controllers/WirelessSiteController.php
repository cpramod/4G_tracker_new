<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class WirelessSiteController extends Controller
{
    public function index()
    {
        $sites = Site::all();
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
}
