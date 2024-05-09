<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
        return Inertia::render('HomePage');
    }
}
