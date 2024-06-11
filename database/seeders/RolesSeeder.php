<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!Role::where('name', 'super-admin')->exists()) {
            $superAdminRole = Role::create(['name' => 'super-admin']);
        } else {
            $superAdminRole = Role::where('name', 'super-admin')->first();
        }
        if (!Role::where('name', 'guest')->exists()) {
            $guestRole = Role::create(['name' => 'guest']);
        }
        $superAdminEmail = 'benedickagdipa1@nbnco.com.au';
        $user = User::where('email', $superAdminEmail)->first();
        if ($user) {
            if (!$user->hasRole('super-admin')) {
                $user->assignRole($superAdminRole);
            }
        }
    }
}
