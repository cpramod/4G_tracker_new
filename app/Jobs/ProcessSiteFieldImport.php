<?php

namespace App\Jobs;

use App\Models\SiteArea;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use League\Csv\Reader;

class ProcessSiteFieldImport implements ShouldQueue
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
            $existingLoc = SiteArea::where('loc_id', $row['Site_Name'])->first();
            if (!$existingLoc) {
                SiteArea::create([
                    'site_name' => $row['Site_Name'],
                    'cell_name' => $row['Cell_Name'],
                    'lon' => $row['Lon'],
                    'lat' => $row['Lat'],
                    'bb_type' => $row['BB_Type'],
                    'rru_type' => $row['RRU_Type'],
                    'antenna_type' => $row['Antenna_Type'],
                    'frequency' => $row['Frequency'],
                    'pci' => $row['PCI'],
                    'azimuth' => $row['Azimuth'],
                    'height' => $row['Height'],
                    'last_epo' => $row['Last_EPO'],
                    'next_epo' => $row['Next_EPO'],
                ]);
            }
        }
    }
}
