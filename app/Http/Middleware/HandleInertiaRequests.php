<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $roleName = 'guest';
        $user = $request->user();

        if ($user && $user->roles->isNotEmpty()) {
            $roleName = $user->roles->first()->name;
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'role' => $roleName,
            ],
            'batch' => [
                'batch_site_id' => session('batch_site_id') ? session('batch_site_id') : null,
                'batch_field_id' => session('batch_field_id') ? session('batch_field_id') : null,
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
