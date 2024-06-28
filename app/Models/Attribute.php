<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attribute extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['entity_id', 'name', 'slug', 'type', 'position', 'sortable', 'editable', 'input_type', 'input_options', 'user_id', 'hidden', 'alternative_name'];
}
