<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::middleware(['web', 'auth:sanctum'])->group(function () {
    Route::get('/verify-email/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return redirect('http://localhost:3000/#/email-verified');
    })->middleware(['signed'])->name('verification.verify');
    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Verification link sent!']);
    })->name('verification.send');
});


require __DIR__.'/auth.php';
