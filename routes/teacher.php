<?php

use App\Http\Controllers\Teach\Question\QuestionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hasNoRole', 'role:teacher'])->prefix('app')->group(function () {
    // questions
    Route::controller(QuestionController::class)->group(function(){
        Route::get('/create-new-qestion', 'index')->name('tech.create.new.questions');
    });
});