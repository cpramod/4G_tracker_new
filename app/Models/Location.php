<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Location extends Model
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
    ];

    public function locTracking()
    {
        return $this->hasMany(LocationTracking::class, 'site_id');
    }

}
