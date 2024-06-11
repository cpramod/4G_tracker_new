<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdditionalColumn extends Model
{
    use HasFactory;
    protected $fillable = ['type', 'name', 'key', 'input_type', 'options'];
}
