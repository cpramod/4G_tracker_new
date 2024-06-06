<?php

namespace App\Jobs;

use App\Models\SiteArea;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessSiteFieldImport implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

    protected $input, $information;

    public function __construct($input, $information)
    {
        $this->input = $input;
        $this->information = $information;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach ($this->information as $row) {
            $existingLoc = SiteArea::where('site_name', $row[$this->input['site_name']])->first();
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
