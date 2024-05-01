<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WirelessLocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();
        return Inertia::render('Wireless/Locations/Index', [
            'locations' => $locations
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required',
            'map_code' => 'required',
        ]);
        $location = Location::create([
            'name' => $request->name,
            'address' => $request->address,
            'map_code' => $request->map_code,
        ]);
        if ($location) {
            return to_route('wireless.location.index');
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required',
            'map_code' => 'required',
        ]);
        $location = Location::findOrFail($id);
        $location->update([
            'name' => $request->name,
            'address' => $request->address,
            'map_code' => $request->map_code,
        ]);
        if ($location) {
            return to_route('wireless.location.index');
        }
    }

    public function delete($id)
    {
        $location = Location::findOrFail($id);
        $location->delete();
        return to_route('wireless.location.index');
    }
}
