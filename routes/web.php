<?php

use App\Http\Controllers\ColumnController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MoFileGeneratorController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\SQLImportController;
use Illuminate\Support\Facades\Route;


Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login');

Route::controller(LocationController::class)->middleware('auth')->group(function () {
    Route::get('/dashboard/wireless-sites', 'index')->name('wireless.sites.index');
    Route::post('/dashboard/wireless-sites/import/csv/', 'import_from_csv')->middleware(['auth', 'role:super-admin'])->name('wireless.sites.import');
    Route::post('/dashboard/wireless-sites/map_fields/', 'map_and_save_csv')->middleware(['auth', 'role:super-admin'])->name('wireless.sites.map.save');
    Route::post('/dashboard/wireless-sites/artifacts/', 'save_artifacts')->name('wireless.sites.update.artifacts');
    Route::post('/dashboard/wireless-sites/', 'save_item')->name('wireless.sites.save.item');
    Route::get('/dashboard/wireless-sites/show/{id}', 'location_site')->name('wireless.show.location.index');
    Route::get('/dashboard/wireless-sites/export', 'export')->name('wireless.sites.export');
    Route::delete('/dashboard/wireless-sites/{id}/delete', 'destroy')->name('wireless.sites.destroy');
});

Route::controller(SiteController::class)->middleware('auth')->group(function () {
    Route::get('/dashboard/fw-sites', 'index')->name('site.field.name.index');
    Route::post('/dashboard/fw-sites/import/csv/', 'import_from_csv')->middleware(['auth', 'role:super-admin'])->name('site.field.name.import');
    Route::post('/dashboard/fw-sites/map_fields/', 'map_and_save_csv')->middleware(['auth', 'role:super-admin'])->name('site.field.map.save');
    Route::post('/dashboard/fw-sites/artifacts/', 'save_artifacts')->name('site.field.name.update.artifacts');
    Route::post('/dashboard/fw-sites/', 'save_item')->name('site.field.name.save.item');
    Route::get('/dashboard/fw-sites/show/{id}', 'show')->name('site.field.name.show');
    Route::get('/dashboard/fw-sites/export', 'export')->name('site.field.name.export');
    Route::delete('/dashboard/fw-sites/{id}/delete', 'destroy')->name('site.field.name.destroy');
});

Route::controller(ColumnController::class)->middleware(['auth', 'role:super-admin'])->group(function () {
    Route::post('/dashboard/additional-columns/', 'save_columns')->name('additional.columns.save.item');
    Route::post('/dashboard/hide-columns/', 'hide_columns')->name('hide.columns.item');
    Route::post('/dashboard/rename-columns/', 'rename_columns')->name('rename.columns.item');
    Route::post('/dashboard/delete-columns/', 'delete_columns')->name('delete.columns.item');
    Route::post('/dashboard/arrange-columns/', 'rearrange_columns')->name('rearrange.columns.item');
    Route::post('/dashboard/restore-table/', 'restore_table')->name('restore.table');
});

Route::get('/dashboard', [PageController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/import/progress', [PageController::class, 'get_progress'])->middleware(['auth', 'verified'])->name('import.progress');

Route::controller(SQLImportController::class)->middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('/dashboard/sql-import', 'index')->name('sql.import');
    Route::post('/dashboard/sql-import/run', 'run_sql_code')->name('sql.run');
    Route::post('/dashboard/sql-import/store', 'store')->name('sql.store');
});

Route::controller(SettingsController::class)->middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('/dashboard/settings', 'index')->name('settings.index');
    Route::post('/dashboard/settings', 'import_db_save')->name('import.db.store');

});

Route::controller(RoleController::class)->middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('/dashboard/roles', 'index')->name('roles.index');
    Route::post('/dashboard/roles/search', 'search_user')->name('roles.user.search');
    Route::post('/dashboard/roles/store', 'user_add_to_role')->name('roles.user.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(MoFileGeneratorController::class)->middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('/dashboard/mo-file-generator', 'index')->name('mo.file.generator');
    Route::post('/dashboard/mo-file-generator/upload', 'upload')->name('mo.file.generator.upload');
});

require __DIR__ . '/auth.php';
