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

    protected $filePath;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $csv = Reader::createFromPath(storage_path('app/' . $this->filePath), 'r');
        $csv->setHeaderOffset(0);
        foreach ($csv as $row) {
            $existingLoc = Site::where('loc_id', $row['LOCID'])->first();
            if (!$existingLoc) {
                Site::create([
                    'loc_id' => $row['LOCID'],
                    'wntd' => $row['WNTD'],
                    'imsi' => $row['IMSI'],
                    'version' => $row['VERSION'],
                    'avc' => $row['AVC'],
                    'bw_profile' => $row['BW_PROFILE'],
                    'lon' => $row['LON'],
                    'lat' => $row['LAT'],
                    'site_name' => $row['SITE_NAME'],
                    'home_cell' => $row['HOME_CELL'],
                    'home_pci' => $row['HOME_PCI'],
                    'traffic_profile' => $row['TRAFFIC_PROFILE'],
                ]);
            }
        }
    }
}
