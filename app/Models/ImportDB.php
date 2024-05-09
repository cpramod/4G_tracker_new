<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportDB extends Model
{
    use HasFactory;

    protected $fillable = ['host', "port", "database", 'username', 'password'];
}
