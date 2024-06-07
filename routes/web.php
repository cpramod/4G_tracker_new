<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SiteFieldController;
use App\Http\Controllers\SQLImportController;
use App\Http\Controllers\WirelessLocationController;
use App\Http\Controllers\WirelessSiteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::controller(PageController::class)->middleware('auth')->group(function () {
//     Route::get('/', 'index')->name('home');
// });

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login');

Route::controller(WirelessSiteController::class)->middleware('auth')->group(function () {
    Route::get('/dashboard/wireless-sites', 'index')->name('wireless.sites.index');
    Route::post('/dashboard/wireless-sites/import/csv/', 'import_from_csv')->name('wireless.sites.import');
    Route::post('/dashboard/wireless-sites/map_fields/', 'map_and_save_csv')->name('wireless.sites.map.save');
    Route::post('/dashboard/wireless-sites/artifacts/', 'save_artifacts')->name('wireless.sites.update.artifacts');
    Route::post('/dashboard/wireless-sites/', 'save_item')->name('wireless.sites.save.item');
    Route::get('/dashboard/wireless-sites/show/{id}', 'location_site')->name('wireless.show.location.index');
});


Route::controller(SiteFieldController::class)->middleware('auth')->group(function () {
    Route::get('/dashboard/fw-sites', 'index')->name('site.field.name.index');
    Route::post('/dashboard/fw-sites/import/csv/', 'import_from_csv')->name('site.field.name.import');
    Route::post('/dashboard/fw-sites/map_fields/', 'map_and_save_csv')->name('site.field.map.save');
    Route::post('/dashboard/fw-sites/artifacts/', 'save_artifacts')->name('site.field.name.update.artifacts');
    Route::post('/dashboard/fw-sites/', 'save_item')->name('site.field.name.save.item');
    Route::get('/dashboard/fw-sites/show/{id}', 'location_site')->name('site.field.name.show.location.index');
});

Route::controller(IssueController::class)->middleware('auth')->group(function () {
    Route::post('/issues/store', 'store')->name('issues.store');
    Route::post('/issues/comment', 'comment_store')->name('issues.comment.store');

    Route::post('/reply/store', 'reply_store')->name('issues.reply.store');
    Route::delete('/reply/store', 'reply_delete')->name('issues.reply.delete');
});

Route::get('/dashboard', [PageController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/import/progress', [PageController::class, 'get_progress'])->middleware(['auth', 'verified'])->name('import.progress');

Route::controller(SQLImportController::class)->middleware('auth')->group(function () {
    Route::get('/dashboard/sql-import', 'index')->name('sql.import');
    Route::post('/dashboard/sql-import/run', 'run_sql_code')->name('sql.run');
    Route::post('/dashboard/sql-import/store', 'store')->name('sql.store');
});

Route::controller(SettingsController::class)->middleware('auth')->group(function () {
    Route::get('/dashboard/settings', 'index')->name('settings.index');
    Route::post('/dashboard/settings', 'import_db_save')->name('import.db.store');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
