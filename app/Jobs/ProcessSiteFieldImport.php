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
            $existingLoc = SiteArea::where('loc_id', $row[$this->input['site_name']])->first();
            if (!$existingLoc) {
                SiteArea::create([
                    'site_name' => $row[$this->input['site_name']],
                    'cell_name' => $row[$this->input['cell_name']],
                    'lon' => $row[$this->input['lon']],
                    'lat' => $row[$this->input['lat']],
                    'bb_type' => $row[$this->input['bb_type']],
                    'rru_type' => $row[$this->input['rru_type']],
                    'antenna_type' => $row[$this->input['antenna_type']],
                    'frequency' => $row[$this->input['frequency']],
                    'pci' => $row[$this->input['pci']],
                    'azimuth' => $row[$this->input['azimuth']],
                    'height' => $row[$this->input['height']],
                    'last_epo' => $row[$this->input['last_epo']],
                    'next_epo' => $row[$this->input['next_epo']],
                ]);
            }
        }
    }
}
