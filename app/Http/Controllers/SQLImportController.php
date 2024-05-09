<?php

namespace App\Http\Controllers;

use App\Models\ImportDB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SQLImportController extends Controller
{
    public function index()
    {
        return Inertia::render('SQLImport/Index');
    }

    public function run_sql_code(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sql_query' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => array('message' => 'SQL query is required')], 500);
        }
        $sql_code = $request->input('sql_query');
        $this->db_connection();
    }

    public function db_connection()
    {
        $db = ImportDB::first();
        if ($db) {
            try {
                config([
                    'database.connections.import' => [
                        'driver' => 'mysql',
                        'host' => $db->host,
                        'port' => $db->port,
                        'database' => $db->database,
                        'username' => $db->username,
                        'password' => $db->password,
                        'charset' => 'utf8mb4',
                        'collation' => 'utf8mb4_unicode_ci',
                        'prefix' => '',
                        'strict' => true,
                        'engine' => null,
                    ]
                ]);
                DB::purge('import');
                DB::reconnect('import');
                if (DB::connection('import')->getDatabaseName()) {
                    $data = $this->getTables(DB::connection('import'), 'users');
                    dd($data);
                } else {
                    dd('error');
                }

            } catch (\Exception $e) {
                return response()->json(['error' => array('message' => $e)], 500);
            }
        }
    }



    public function store(Request $request)
    {
        $request->validate([
            'host' => 'required',
            'port' => 'required',
            'database' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);
        try {
            config([
                'database.connections.import' => [
                    'driver' => 'mysql',
                    'host' => $request->input('host'),
                    'port' => $request->input('port'),
                    'database' => $request->input('database'),
                    'username' => $request->input('username'),
                    'password' => $request->input('password'),
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                    'prefix' => '',
                    'strict' => true,
                    'engine' => null,
                ]
            ]);
            DB::purge('import');
            DB::reconnect('import');

            if (DB::connection('import')->getDatabaseName()) {
                $data = $this->getTables(DB::connection('import'), 'users');
                dd($data);
            } else {
                dd('error');

            }

        } catch (\Exception $e) {
            dd($e);
        }
    }

    private function getTables($connection, $table_name)
    {
        return $connection->table($table_name)->get();
    }
}
