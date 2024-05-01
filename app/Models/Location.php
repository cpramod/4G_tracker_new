<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'map_code'];

    public function sites()
    {
        return $this->hasMany(Site::class);
    }
}
