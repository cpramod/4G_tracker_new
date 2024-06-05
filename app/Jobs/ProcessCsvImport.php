<?php

namespace App\Jobs;

use App\Models\Site;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use League\Csv\Reader;

class ProcessCsvImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

    protected $filePath, $input;

    public function __construct($filePath, $input)
    {
        $this->filePath = $filePath;
        $this->input = $input;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $csv = Reader::createFromPath(storage_path('app/' . $this->filePath), 'r');
        $csv->setHeaderOffset(0);
        foreach ($csv as $row) {
            $existingLoc = Site::where('loc_id', $this->input['loc_id'])->first();
            if (!$existingLoc) {
                Site::create([
                    'loc_id' => $row[$this->input['loc_id']],
                    'wntd' => $row[$this->input['wntd']],
                    'imsi' => $row[$this->input['imsi']],
                    'version' => $row[$this->input['version']],
                    'avc' => $row[$this->input['avc']],
                    'bw_profile' => $row[$this->input['bw_profile']],
                    'lon' => $row[$this->input['lon']],
                    'lat' => $row[$this->input['lat']],
                    'site_name' => $row[$this->input['site_name']],
                    'home_cell' => $row[$this->input['home_cell']],
                    'home_pci' => $row[$this->input['home_pci']],
                    'traffic_profile' => $row[$this->input['traffic_profile']],
                ]);
            }
        }
    }
}
