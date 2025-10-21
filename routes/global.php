<?php

use App\Http\Controllers\Shared\Questions\QuestionsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'hasNoRole', 'role:teacher'])->prefix('app')->group(function () {
    // questions
    Route::controller(QuestionsController::class)->group(function () {
        Route::get('/create-new-paper', 'index')->name('g.create.new.questions');
        Route::post('/create-paper', 'store_paper')->name('g.create.new.questions.paper');
    });
});
