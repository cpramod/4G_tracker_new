<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
    use HasFactory, SoftDeletes;

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
