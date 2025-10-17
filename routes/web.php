<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Ui\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['isMaintance'])->group(function () {
    // public routes
    Route::get('/', [HomeController::class, 'index'])->name('home');

    // guest auth routes
    Route::middleware('guest')->controller(AuthController::class)->prefix('auth')->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::get('/singup', 'singup')->name('singup');
        Route::get('/forgate', 'forgate')->name('forgate');
        Route::get('/reset-password', 'resetpassword')->name('reset.password');

        Route::post('/login', 'login_store')->name('login.post');
        Route::post('/singup', 'singup_update')->name('singup.post');
        Route::post('/forgate', 'forgate_update')->name('forgate.post');
        Route::post('/reset-password', 'update_resetpassword')->name('resetpassword.post');

        // google auth
        Route::get('/google/redirect', 'google_redirect')->name('google.redirect');
        Route::get('/google/callback', 'google_callback');
    });

    // auth routes for role selection
    Route::controller(AuthController::class)->middleware('hasRole')->prefix('auth')->group(function () {
        Route::get('/role-selcet', 'choice_role')->name('role.select');
        Route::post('/role-selcet', 'choice_role_update')->name('role.select.post');
    });
});

// single routes
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// maintenance mode routes
Route::get('/maintenance', function () {
    return Inertia::render('Errors/Maintenance');
})->name('maintenance');

// other routes files
include __DIR__ . '/admin.php';