<?php

namespace App\Http\Controllers;

use App\Models\AdditionalColumn;
use App\Models\ColumnOption;
use App\Models\Location;
use App\Models\LocationTracking;
use Carbon\Carbon;
use Illuminate\Support\Facades\Bus;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Jobs\ProcessCsvImport;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use League\Csv\Reader;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

class LocationController extends Controller
{
    public function index(Request $request)
    {
        $order = $request->input('order');
        $order_by = $request->input('order_by') ? $request->input('order_by') : 'id';
        $search_query = $request->input('search');
        $per_page = $request->input('per_page') && strtolower($request->input('per_page')) === 'all' ? PHP_INT_MAX : ($request->input('per_page') ? $request->input('per_page') : 10);

        if ($search_query) {
            $tableName = (new Location())->getTable();
            $columns = \Schema::getColumnListing($tableName);
            $sites = Location::where(function ($query) use ($search_query, $columns) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search_query . '%');
                }
            })->orderBy($order_by, $order ? $order : 'asc')->paginate($per_page);

        } elseif ($request->input('filter_by') && $request->input('value')) {

            $sites = Location::whereHas('locTracking', function ($query) use ($request) {
                $query->where('key', $request->input('filter_by'));
                $query->where('value', $request->input('value'));
            })->orderBy($order_by, $order ? $order : 'asc')->paginate($per_page);

        } else {
            $sites = Location::orderBy($order_by, $order ? $order : 'asc')->paginate($per_page);
        }
        $hidden_columns = ColumnOption::where('type', 'wntd')->where('key', 'hide')->pluck('value')->first();
        $hidden_columns_names = ColumnOption::where('type', 'wntd')->where('key', 'hide')->pluck('names')->first();
        $renamed_columns = ColumnOption::where('type', 'wntd')->where('key', 'rename')->pluck('value')->first();
        $deleted_columns = ColumnOption::where('type', 'wntd')->where('key', 'delete')->pluck('value')->first();
        $arrange_columns = ColumnOption::where('type', 'wntd')->where('key', 'arrange')->pluck('value')->first();
        $additional_columns_keys = AdditionalColumn::where('type', 'wntd')->pluck('key')->toArray();
        $additional_columns = AdditionalColumn::where('type', 'wntd')->get();
        $desiredKeys = array_merge(['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'], $additional_columns_keys);
   
        foreach ($sites as $site) {

            $tracking_data = LocationTracking::where('site_id', $site->id)
                ->whereIn('key', $desiredKeys)
                ->get()
                ->keyBy('key')
                ->toArray();
           
            foreach ($tracking_data as $key => $value) {
                $site->{$key} = $value['value'];
            }
        }
        return Inertia::render('WNTD/Index', [
            'sites' => $sites,
            'get_data' => $request->all(),
            'additional_columns' => $additional_columns,
            'hidden_columns' => json_decode($hidden_columns),
            'hidden_columns_names' => json_decode($hidden_columns_names),
            'renamed_columns' => json_decode($renamed_columns),
            'deleted_columns' => json_decode($deleted_columns),
            'arrange_columns' => json_decode($arrange_columns),
        ]);
    }

    public function save_item(Request $request)
    {
   
        $items = $request->items;
        $static_items = ["wntd", "imsi", "version", "avc", "bw_profile", "lon", "lat", "site_name", "home_cell", "home_pci", "traffic_profile"];
        foreach ($items as $key => $item) {
            if (in_array($key, $static_items)) {
                $trackingItem = Location::findOrFail($request->site_id);
                $trackingItem->{$key} = $item;
                $trackingItem->save();
            } else {
            
                $tracking = LocationTracking::create([
                    'site_id' => $request->site_id,
                    'loc_id' => $request->location_id,
                    'user_id' => Auth::id(),
                    'key' => $key,
                    'value' => $item,
                ]);
            }
        }
        return response()->json([
            'success' => ['message' => 'Changes saved successfully.'],
        ], 200);
    }

    public function save_artifacts(Request $request)
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
        if (count($paths_array) > 0) {
            $tracking = LocationTracking::create([
                'site_id' => $request->site_id,
                'loc_id' => $request->location_id,
                'user_id' => Auth::id(),
                'key' => $request->field_name,
                'value' => json_encode($paths_array),
            ]);
        }
        return to_route('wireless.sites.index');
    }
    public function get_artifacts(Request $request)
    {
        $filePath = public_path($request->input('q'));
    
    if (file_exists($filePath)) {
        return response()->download($filePath);
    } else {
        abort(404, 'File not found.');
    }
    }


    public function import_from_csv(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'import_file' => 'required|file|mimes:csv',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => array('message' => $validator->errors()->first())], 500);
        }
        $file = $request->file('import_file');
        $filePath = $file->storeAs('import', now()->timestamp . "_{$file->getClientOriginalName()}");
        $csv = Reader::createFromPath(storage_path('app/' . $filePath), 'r');
        $csv->setHeaderOffset(0);
        $header = $csv->getHeader();
        return response()->json([
            'filePath' => $filePath,
            'header' => $header
        ], 200);
    }

    public function map_and_save_csv(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'loc_id' => 'required',
            'wntd' => 'required',
            'imsi' => 'required',
            'version' => 'required',
            'avc' => 'required',
            'bw_profile' => 'required',
            'lon' => 'required',
            'lat' => 'required',
            'site_name' => 'required',
            'home_cell' => 'required',
            'home_pci' => 'required',
            'traffic_profile' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => array('message' => $validator->errors()->first())], 500);
        }
        $filePath = $request->input('file_path');
        $input = $request->all();
        $csv = Reader::createFromPath(storage_path('app/' . $filePath), 'r');
        $csv->setHeaderOffset(0);
        $rows = $csv->getRecords();
        $dataFromCsv = [];
        foreach ($rows as $row) {
            $dataFromCsv[] = $row;
        }
        $dataFromCsv = array_chunk($dataFromCsv, 300);
        $batch = Bus::batch([])->dispatch();
        foreach ($dataFromCsv as $index => $dataCsv) {
            foreach ($dataCsv as $data) {
                $information[$index][] = $data;
            }
            $batch->add(new ProcessCsvImport($input, $information[$index]));
        }
        session()->put('batch_site_id', $batch->id);
        return response()->json([
            'success' => ['message' => 'Sites imported successfully.'],
            'batch_id' => $batch->id,
        ], 200);
    }

    public function location_site($id)
    {
        $site = Location::findOrFail($id);
        $desiredKeys = ['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'];
        $locTrackingData = LocationTracking::where('site_id', $site->id)->whereIn('key', $desiredKeys)->get()->keyBy('key')->toArray();
        $site->tracking = $locTrackingData;

        $trackings = LocationTracking::with('user')->where('site_id', $id)->orderBy('created_at', 'desc')->get();
        return Inertia::render('WNTD/Show', [
            'site' => $site,
            'trackings' => $trackings
        ]);
    }

    public function export()
    {
        set_time_limit(0);
        ini_set('memory_limit', '-1');
        $csvFileName = 'WNTD_data.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
        ];
        $sites = Location::all();
        $desiredKeys = ['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'];
  
        foreach ($sites as $site) {
    
            $locTrackingData = LocationTracking::where('site_id', $site->id)
                ->whereIn('key', $desiredKeys)
                ->get()
                ->keyBy('key')
                ->toArray();
            $site->tracking = $locTrackingData;
        }
 
       
        $callback = function () use ($sites) {
            $file = fopen('php://output', 'w');
            $tempAdditionalColumn=[];
            $tempAdditionalColumnKey=[];
            $additional_columns = AdditionalColumn::where('type', 'wntd')->get();
 
           
            foreach ($additional_columns as $column) {
                // This assumes there's a method to get additional data. Adjust as per your actual data model.
                array_push($tempAdditionalColumn,strtoupper($column->name));
                array_push($tempAdditionalColumnKey,$column->key);
            }
            $hidden_columns_names = ColumnOption::where('type', 'wntd')->where('key', 'hide')->pluck('names')->first();
            $additional_columns_keys = AdditionalColumn::where('type', 'wntd')->pluck('key')->toArray();
            $merged_data=array_merge(
                array(
                    'LOCID',
                    'WNTD',
                    'IMSI',
                    'VERSION',
                    'AVC',
                    'BW Profile',
                    'Lon',
                    'Lat',
                    'SiteName',
                    'HomeCell',
                    'HomePCI',
                    'Traffic Profile',
                    'Start Date',
                    'End Date',
                    'Solution Type',
                    'Status',
                    'Remarks',
                    'Artifacts'
                ),$tempAdditionalColumn);
            $filtered_merged_data=array_diff($merged_data,json_decode($hidden_columns_names)?json_decode($hidden_columns_names):[]);
             
            fputcsv(
                $file,
                $filtered_merged_data,
            );

            foreach ($sites as $row) {
                $desiredKeys = array_merge(['remarks', 'start_date', 'end_date', 'solution_type', 'status', 'artifacts'], $additional_columns_keys);
                $hidden_columns = ColumnOption::where('type', 'wntd')->where('key', 'hide')->pluck('value')->first();
                $tracking_data = LocationTracking::where('site_id', $row->id)
                ->whereIn('key', $desiredKeys)
                ->get()
                ->keyBy('key')
                ->toArray();
                $tempLocationTrackingData=[];
                foreach($tempAdditionalColumnKey as $value){
                    if (isset($tracking_data[$value]) && isset($tracking_data[$value]['value'])) {
                        array_push($tempLocationTrackingData, $tracking_data[$value]['value']);
                    }
                    else{
                        array_push($tempLocationTrackingData, '');
                    }
                }
               $decoded_values=[];
         
               $all_tracking_data=['start_date','end_date','solution_type','status','remarks','artifacts'];
               $decoded_data=json_decode($hidden_columns)?json_decode($hidden_columns):[];
               foreach($decoded_data as $itm){
                
                if(isset($itm)){
                    if(in_array($itm,$all_tracking_data)){
                        $decoded_values[]= $this->get_tracking_value($row['tracking'], $itm);
                    }
                    else{             
                        $decoded_values[]=$row[$itm];
                    }
                }
               }
       
                $merged_data_values_second= 
                    array(
                        $row['loc_id'],
                        $row['wntd'],
                        $row['imsi'],
                        $row['version'],
                        $row['avc'],
                        $row['bw_profile'],
                        $row['lon'],
                        $row['lat'],
                        $row['site_name'],
                        $row['home_cell'],
                        $row['home_pci'],
                        $row['traffic_profile'],
                        $this->get_tracking_value($row['tracking'], 'start_date'),
                        $this->get_tracking_value($row['tracking'], 'end_date'),
                        $this->get_tracking_value($row['tracking'], 'solution_type'),
                        $this->get_tracking_value($row['tracking'], 'status'),
                        $this->get_tracking_value($row['tracking'], 'remarks'),
                        $this->get_tracking_value($row['tracking'], 'artifacts')
                    );
                 
               
                    $filtered_merged_data_values = [];
           
                    $tempTest=[];
                    foreach($tempAdditionalColumnKey as $value){
                        if(!in_array($value,$decoded_data)){
                            $tempTest[]=$value;
                        }
                        
                    }
                    $merged_data_values=array_merge($merged_data_values_second,$tempTest);
                foreach ($merged_data_values as $key => $value) {
                   if($value){

                       if (!in_array($value, $decoded_values)) {
                           
                           $filtered_merged_data_values[$key] = $value;
                        }
                    }
                    else{
                        $filtered_merged_data_values[$key]='';
                    }
                }
                 
                fputcsv(
                    $file,
                    $filtered_merged_data_values,
                );
            }
            fclose($file);
        };
 
        return new StreamedResponse($callback, 200, $headers);
    }

    public function get_tracking_value($items, $key)
    {
        if (array_key_exists($key, $items)) {
            $item = $items[$key];
            if (isset($item)) {
                if ($key == 'start_date' || $key == 'end_date') {
                    return Carbon::parse($item['value'])->format('d/m/Y');
                }
                return $item['value'];
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    public function destroy($id)
    {
        $location = Location::findOrFail($id);
        $location->delete();
    }

    public function add_row(Request $request)
    {
        $item = $request->newItem;
        $location = Location::create([
            'loc_id' => $item['loc_id'],
            'wntd' => $item['wntd'] ? $item['wntd'] : '',
            'imsi' => $item['imsi'] ? $item['imsi'] : '',
            'version' => $item['version'] ? $item['version'] : '',
            'avc' => $item['avc'] ? $item['avc'] : '',
            'bw_profile' => $item['bw_profile'] ? $item['bw_profile'] : '',
            'lon' => $item['lon'] ? $item['lon'] : '',
            'lat' => $item['lat'] ? $item['lat'] : '',
            'site_name' => $item['site_name'] ? $item['site_name'] : '',
            'home_cell' => $item['home_cell'] ? $item['home_cell'] : '',
            'home_pci' => $item['home_pci'] ? $item['home_pci'] : '',
            'traffic_profile' => $item['traffic_profile'] ? $item['traffic_profile'] : '',
        ]);
        $mainTable = array('loc_id', 'wntd', 'imsi', 'version', 'avc', 'bw_profile', 'lon', 'lat', 'site_name', 'home_cell', 'home_pci', 'traffic_profile');
        foreach ($item as $key => $value) {
            if (!in_array($key, $mainTable)) {
                LocationTracking::create([
                    'site_id' => $location->id,
                    'loc_id' => $item['loc_id'],
                    'user_id' => Auth::id(),
                    'key' => $key,
                    'value' => $value
                ]);
            }
        }
    }
}
