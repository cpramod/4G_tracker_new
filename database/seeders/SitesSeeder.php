<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;


class SitesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sites')->insert([
            [
                'loc_id' => 'LOC000001',
                'wntd' => 'NTD000001',
                'imsi' => '5355000000',
                'version' => 'V1',
                'avc' => 'AVC000001',
                'bw_profile' => 'HomeFast',
                'lon' => '',
                'lat' => '',
                'site_name' => 'Melbourne',
                'home_cell' => 'YYYY001',
                'home_pci' => '123',
                'traffic_profile' => 'Y',
                'start_date' => '',
                'end_date' => '',
                'solution_type' => '',
                'status' => '',
                'remarks' => '',
                'artifacts' => '',
            ],
            [
                'loc_id' => 'LOC000002',
                'wntd' => 'NTD000002',
                'imsi' => '5355000000',
                'version' => 'V2',
                'avc' => 'AVC000002',
                'bw_profile' => 'HomeFast',
                'lon' => '',
                'lat' => '',
                'site_name' => 'Perth',
                'home_cell' => 'YYYY002',
                'home_pci' => '123',
                'traffic_profile' => 'Y',
                'start_date' => '',
                'end_date' => '',
                'solution_type' => '',
                'status' => '',
                'remarks' => '',
                'artifacts' => '',
            ],
            [
                'loc_id' => 'LOC000003',
                'wntd' => 'NTD000003',
                'imsi' => '5355000000',
                'version' => 'V3',
                'avc' => 'AVC000003',
                'bw_profile' => 'HomeFast',
                'lon' => '',
                'lat' => '',
                'site_name' => 'Brisbane',
                'home_cell' => 'YYYY003',
                'home_pci' => '123',
                'traffic_profile' => 'Y',
                'start_date' => '',
                'end_date' => '',
                'solution_type' => '',
                'status' => '',
                'remarks' => '',
                'artifacts' => '',
            ],
            [
                'loc_id' => 'LOC000004',
                'wntd' => 'NTD000004',
                'imsi' => '5355000000',
                'version' => 'V4',
                'avc' => 'AVC000004',
                'bw_profile' => 'HomeFast',
                'lon' => '',
                'lat' => '',
                'site_name' => 'Darwin',
                'home_cell' => 'YYYY004',
                'home_pci' => '123',
                'traffic_profile' => 'Y',
                'start_date' => '',
                'end_date' => '',
                'solution_type' => '',
                'status' => '',
                'remarks' => '',
                'artifacts' => '',
            ],

        ]);
    }
}
