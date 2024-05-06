<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Site extends Model
{
    use HasFactory;

    protected $fillable = [
        'loc_id',
        'wntd',
        'imsi',
        'version',
        'avc',
        'bw_profile',
        'lon',
        'lat',
        'site_name',
        'home_cell',
        'home_pci',
        'traffic_profile',
        'start_date',
        'end_date',
        'solution_type',
        'status',
        'remarks',
        'artifacts',
    ];

    public function tracking()
    {
        return $this->hasMany(LocTracking::class);
    }
}
