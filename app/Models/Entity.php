<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Entity extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['title', 'slug', 'user_id'];

    public function table_columns()
    {
        $this->hasMany(Attribute::class, 'entity_id');
    }
}
