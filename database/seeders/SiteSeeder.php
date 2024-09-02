<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class SiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        DB::table('sites')->insert([
            'site_name'=>'bbc16',
            'cell_name'=>'cbc16',
            'lon'=>'dbc16',
            'lat'=>'ebc16',
            'bb_type'=>'fbc16',
            'rru_type'=>'gbc161',
            'antenna_type'=>'hbc161',
            'frequency'=>'ibc161',
            'pci'=>'gaga16',
            'azimuth'=>'ttata16',
            'height'=>'tgw16',
            'last_epo'=>'tes16t_id16',
            'next_epo'=>'tes16t_id16',
            'end_date' => now(),
            'start_date' => now(),
        ]);
    }
}
