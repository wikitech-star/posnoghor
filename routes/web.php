<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\Question\QuestionController;
use App\Http\Controllers\Backend\School\GroupClassController;
use App\Http\Controllers\Backend\School\LassionController;
use App\Http\Controllers\Backend\School\QuestionTypeController;
use App\Http\Controllers\Backend\School\SubjectsController;
use App\Http\Controllers\Backend\Setting\GoogleAuthController;
use App\Http\Controllers\Backend\Setting\MailSettingController;
use App\Http\Controllers\Backend\Setting\SiteSettingController;
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

        // lassion routes
        Route::controller(LassionController::class)->group(function () {
            Route::get('/lassion', 'index')->name('ux.lassion');
            Route::post('/lassion', 'store')->name('ux.lassion.store');
            Route::get('/lassion/{id}', 'show')->name('ux.lassion.show');
            Route::get('/lassion/del/{id}', 'destroy')->name('ux.lassion.del');
        });

        // question type routes
        Route::controller(QuestionTypeController::class)->group(function () {
            Route::get('/question-type', 'index')->name('ux.question.type');
            Route::post('/question-type', 'store')->name('ux.question.type.store');
            Route::get('/question-type/{id}', 'show')->name('ux.question.type.show');
            Route::get('/question-type/del/{id}', 'destroy')->name('ux.question.type.del');
        });

        // questions
        Route::controller(QuestionController::class)->prefix('/question')->group(function(){
            Route::get('/add', 'add_view')->name('ux.question.add');
        });

        // setting routes
        // site setting
        Route::controller(SiteSettingController::class)->prefix('/setting')->group(function () {
            Route::get('/site-setting', 'index')->name('ux.site.setting');
            Route::get('/site-setting-maintenance', 'updateMaintenance')->name('ux.site.setting.maintenance');
            Route::post('/site-setting', 'update')->name('ux.site.setting.post');
        });
        // mail setting
        Route::controller(MailSettingController::class)->prefix('/setting')->group(function () {
            Route::get('/mail-setting', 'index')->name('ux.mail.setting');
            Route::post('/mail-setting', 'update')->name('ux.mail.setting.post');
        });
        // google auth setting
        Route::controller(GoogleAuthController::class)->prefix('/setting')->group(function(){
             Route::get('/goole-auth-setting', 'index')->name('ux.goolge.auth.setting');
             Route::get('/goole-auth-setting-status', 'updateStatus')->name('ux.goolge.auth.setting.status');
            Route::post('/goole-auth-setting', 'update')->name('ux.goolge.auth.setting.post');
        });

        // single routes
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    });
});

// maintenance mode routes
Route::get('/maintenance', function () {
    return Inertia::render('Errors/Maintenance');
})->name('maintenance');