<?php

namespace App\Http\Controllers;

use App\Models\ImportDB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $db = ImportDB::get();
        return Inertia::render('Settings/Index', [
            'db' => $db
        ]);
    }

    public function import_db_save(Request $request)
    {
        
        $request->validate([
            'id' => 'nullable', 
            'dbtype'=>'required',
            'host' => 'required',
            'port' => 'required',
            'database' => 'required',
            'username' => 'required',
            'password' => 'required',
            'sslrequired'=>'required',
            'catalog'=>'nullable',
        ]);
     
        if ($request->has('id')) {
         
            $db = ImportDB::find($request->id);
            if ($db) {
         
                $db->update($request->except('id')); // Update the record with all fields except 'id'
            }
            return response()->json([
                'success' => ['message' => 'Saved successfully.'],
            ], 200);
        } else {
      
       
            ImportDB::create($request->all());
            return to_route('settings.index');
        }


    }
    public function import_db_delete($id)
    {
        $db = ImportDB::find($id);
        if ($db) {
            $db->delete();
        }
        return back();
    }
    
}
