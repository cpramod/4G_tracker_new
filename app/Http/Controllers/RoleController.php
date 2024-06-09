<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::withCount('users')->get();
        $usersWithoutRolesCount = User::doesntHave('roles')->count();
        return Inertia::render('Roles/Index', [
            'roles' => $roles,
            'noRoles' => $usersWithoutRolesCount
        ]);
    }
    public function search_user(Request $request)
    {
        $search = $request->input('query');
        if (!empty($search)) {
            $users = User::where('email', 'like', "%$search%")
                ->get();
            return $users;
        }
    }

    public function user_add_to_role(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'role_name' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();
        if ($user) {
            $existingRole = $user->roles->pluck('name')->toArray();
            if ($existingRole) {
                $user->removeRole($existingRole[0]);
            }
            $newRole = Role::where('name', $request->role_name)->first();
            if ($newRole) {
                $user->assignRole($newRole);
                return to_route('roles.index');
            }
        }
    }
}
