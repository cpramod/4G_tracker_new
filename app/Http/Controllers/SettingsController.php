<?php

namespace App\Http\Controllers;

use App\Models\ImportDB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $db = ImportDB::first();
        return Inertia::render('Settings/Index', [
            'db' => $db
        ]);
    }

    public function import_db_save(Request $request)
    {
    
        $request->validate([
            'dbtype'=>'required',
            'host' => 'required',
            'port' => 'required',
            'database' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);

        if (ImportDB::count() > 0) {
            $db = ImportDB::first();
            $db->update($request->all());
        } else {
            ImportDB::create($request->all());
        }
        return to_route('settings.index');
    }
}
