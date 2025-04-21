<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::get('chat', [ChatController::class, 'index'])->name('chat');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('chat', [ChatController::class, 'index']);
    Route::post('chat/response', [ChatController::class, 'getResponse']);
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
