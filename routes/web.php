<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\School\GroupClassController;
use App\Http\Controllers\Backend\School\SubjectsController;
use App\Http\Controllers\Ui\HomeController;
use Illuminate\Support\Facades\Route;


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
});

// auth routes for role selection
Route::controller(AuthController::class)->middleware('hasRole')->prefix('auth')->group(function () {
    Route::get('/role-selcet', 'choice_role')->name('role.select');
    Route::post('/role-selcet', 'choice_role_update')->name('role.select.post');
});


// auth routes
Route::middleware(['auth', 'hasNoRole'])->prefix('app')->group(function () {
    // dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('ux.dashboard');

    // class routes
    Route::controller(GroupClassController::class)->group(function () {
        Route::get('/group-class', 'index')->name('ux.group.class');
        Route::post('/group-class', 'store')->name('ux.group.class.store');
        Route::get('/group-class/{id}', 'show')->name('ux.group.class.show');
        Route::get('/group-class/del/{id}', 'destroy')->name('ux.group.class.del');
    });

    // subject routes
    Route::controller(SubjectsController::class)->group(function () {
        Route::get('/subjects', 'index')->name('ux.subjects');
        Route::post('/subjects', 'store')->name('ux.subjects.store');
        Route::get('/subjects/{id}', 'show')->name('ux.subjects.show');
        Route::get('/subjects/del/{id}', 'destroy')->name('ux.subjects.del');
    });

    // single routes
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});
