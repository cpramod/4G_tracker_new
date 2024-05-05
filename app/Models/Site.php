<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
