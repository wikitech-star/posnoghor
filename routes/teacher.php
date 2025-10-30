<?php

use App\Http\Controllers\Teacher\InstituteController;
use Illuminate\Support\Facades\Route;

Route::controller(InstituteController::class)->group(function () {
    Route::get('/institute', 'index')->name('tech.institute.index');
    Route::post('/institute', 'store')->name('tech.institute.post');
    Route::post('/institute-name-request', 'name_request')->name('tech.institute.name.request');
});
