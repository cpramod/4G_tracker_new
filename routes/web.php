<?php

use App\Http\Controllers\IssueController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SQLImportController;
use App\Http\Controllers\WirelessLocationController;
use App\Http\Controllers\WirelessSiteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(PageController::class)->middleware('auth')->group(function () {
    Route::get('/', 'index')->name('home');
});

Route::controller(WirelessSiteController::class)->middleware('auth')->group(function () {
    Route::get('/dashboard/wireless-sites', 'index')->name('wireless.sites.index');
    Route::post('/dashboard/wireless-sites/import/csv/', 'import_from_csv')->name('wireless.sites.import');
    Route::post('/dashboard/wireless-sites/artifacts/', 'save_artifacts')->name('wireless.sites.update.artifacts');
    Route::post('/dashboard/wireless-sites/', 'save_item')->name('wireless.sites.save.item');
    Route::get('/dashboard/wireless-sites/show/{id}', 'location_site')->name('wireless.show.location.index');
});

Route::controller(IssueController::class)->middleware('auth')->group(function () {
    Route::post('/issues/store', 'store')->name('issues.store');
    Route::post('/issues/comment', 'comment_store')->name('issues.comment.store');

    Route::post('/reply/store', 'reply_store')->name('issues.reply.store');
    Route::delete('/reply/store', 'reply_delete')->name('issues.reply.delete');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::controller(SQLImportController::class)->middleware('auth')->group(function () {
    Route::get('/dashboard/sql-import', 'index')->name('sql.import');
    Route::post('/dashboard/sql-import/run', 'run_sql_code')->name('sql.run');
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
