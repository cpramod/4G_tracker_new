<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FieldTracking extends Model
{
    use HasFactory;

    protected $fillable = ["site_area_id", "user_id", "key", "value"];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
