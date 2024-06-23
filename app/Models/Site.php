<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Site extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'site_name',
        'cell_name',
        'lon',
        'lat',
        'bb_type',
        'rru_type',
        'antenna_type',
        'frequency',
        'pci',
        'azimuth',
        'height',
        'last_epo',
        'next_epo',
        'solution_type',
        'start_date',
        'end_date',
        'status',
        'remarks',
        'artifacts',
    ];

    public function tracking()
    {
        return $this->hasMany(SiteTracking::class, 'site_area_id');
    }
}
