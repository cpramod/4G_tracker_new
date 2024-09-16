<?php

namespace App\Http\Controllers;

use App\Models\ImportDB;
use App\Models\Location;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Response;

class SQLImportController extends Controller
{
    public function index()
    {
        $db = ImportDB::first();
        try {
            config([
                'database.connections.import' => [
                    'driver' => $db->dbtype,
                    'host' => $db->host,
                    'port' => $db->port,
                    'database' => $db->database,
                    'username' => $db->username,
                    'password' => $db->password,
                    'charset' => $db->dbtype == 'mysql' ? 'utf8mb4' : 'utf8',
                    'collation' => $db->dbtype == 'mysql' ? 'utf8mb4_unicode_ci' : '',
                    'prefix' => '',
                    'strict' => true,
                    'engine' => null,
                ]
            ]);
        
            // Set the new connection as default
            DB::setDefaultConnection('import');
        
            $tablesNames = [];
            $columnsByTable = [];
        
            if ($db->dbtype == 'mysql') {
                // Fetch all table names
                $tables = DB::select('SHOW TABLES');
                $databaseName = $db->database;
                $column = "";
        
                // Iterate over each table and fetch its columns
                foreach ($tables as $table) {
                    $tableName = $table->$column;
                    $tablesNames[] = $tableName;
        
                    // Fetch columns of the table
                    $columns = DB::select("SHOW COLUMNS FROM $tableName");
                    $columnsByTable[$tableName] = $columns;
                }
            } elseif ($db->dbtype == 'pgsql') {
                // Fetch all table names
                $tables = DB::select("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
        
                // Iterate over each table and fetch its columns
                foreach ($tables as $table) {
                    $tableName = $table->tablename;
                    $tablesNames[] = $tableName;
        
                    // Fetch columns of the table
                    $columns = DB::select("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = ?", [$tableName]);
                    $columnsByTable[$tableName] = $columns;
                }
            } else {
                throw new Exception("Unsupported database type: " . $db->dbtype);
            }
        
        } catch (\Exception $e) {
            return response()->json(['error' => ['message' => $e->getMessage()]], 500);
        }
       
        // Pass both table names and columns to the view
        return Inertia::render('SQLImport/Index', [
            'tablesNames' => $tablesNames,
            'columnsByTable' => $columnsByTable
        ]);
    }

    public function run_sql_code(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sql_query' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => array('message' => 'SQL code is required.')], 500);
        }
        $sql_code = $request->input('sql_query');
        $result = $this->db_connection($sql_code);
        return $result;
    }

    public function db_connection($sql_code)
    {
        $db = ImportDB::first();
      
        if ($db) {
            try {
                config([
                    'database.connections.import' => [
                        'driver' => $db->dbtype,
                        'host' => $db->host,
                        'port' => $db->port,
                        'database' => $db->database,
                        'username' => $db->username,
                        'password' => $db->password,
                        'charset' => $db->dbtype=='mysql'?'utf8mb4':'utf8',
                        'collation' =>$db->dbtype=='mysql'? 'utf8mb4_unicode_ci':'',
                        'prefix' => '',
                        'strict' => true,
                        'engine' => null,
                    ]
                ]);
                DB::purge('import');
                DB::reconnect('import');
                $connected = DB::connection('import')->getPdo() !== null;
                if ($connected) {
                    $data = $this->executeQuery(DB::connection('import'), $sql_code);
                    if (is_array($data)) {
                        return response()->json(['data' => $data], 200);
                    }
                    if ($data->getStatusCode() == 500) {
                        return $data;
                    }
                }
            } catch (\Exception $e) {
                return response()->json(['error' => ['message' => $e->getMessage()]], 500);
            }
        } else {
            return response()->json(['error' => ['message' => 'No database connection found.']], 500);
        }
    }

    private function executeQuery($connection, $sql)
    {
        try {
            return $connection->select($sql);
        } catch (\Exception $e) {
            return response()->json(['error' => ['message' => $e->getMessage()]], 500);
        }
    }

    public function store(Request $request)
    {
        if (is_array($request->data)) {
            $data = $request->data;
            foreach ($data as $item) {
                $existingLoc = Location::where('loc_id', $item['loc_id']?$item['loc_id']:$item['LOCID'])->first();
                if (!$existingLoc) {
                    Location::create([
                        'loc_id' =>  $item['loc_id']?$item['loc_id']:$item['LOCID'],
                        'wntd' => $item['wntd']?$item['wntd']:$item['WNTD'],
                        'imsi' => $item['imsi']?$item['imsi']:$item['IMSI'],
                        'version' => $item['version']?$item['version']:$item['VERSION'],
                        'avc' => $item['avc']?$item['avc']:$item['AVC'],
                        'bw_profile' => $item['bw_profile']?$item['bw_profile']:$item['BW_PROFILE'],
                        'lon' => $item['lon']?$item['lon']:$item['LON'],
                        'lat' => $item['lat']?$item['lat']:$item['LAT'],
                        'site_name' => $item['site_name']?$item['site_name']:$item['SITE_NAME'],
                        'home_cell' =>$item['home_cell']?$item['home_cell']:$item['HOME_CELL'],
                        'home_pci' => $item['home_pci']?$item['home_pci']:$item['HOME_PCI'],
                        'traffic_profile' => $item['traffic_profile']?$item['traffic_profile']:$item['TRAFFIC_PROFILE'],
                    ]);
                } else {
                    $locId=$item['loc_id']?$item['loc_id']:$item['LOCID'];
                    return response()->json([
                        'error' => array(
                            'message' => 'Site with LOCID ' .  $locId . ' already exists',
                        )
                    ], 500);
                }
            }
            return response()->json([
                'success' => array(
                    'message' => 'Data imported successfully.',
                )
            ], 200);
        }

    }
}
