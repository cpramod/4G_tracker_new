<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
        $sites = Site::with([
            'location' => function ($query) {
                $query->select('id', 'name', 'address');
            },
            'user' => function ($query) {
                $query->select('id', 'name');
            }
        ])->get();
        return Inertia::render('HomePage', [
            'sites' => $sites
        ]);
    }
}
