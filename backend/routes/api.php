<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ✅ セッションベースの認証（Sanctum）用ルート（ログイン）
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/register',[AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout',[AuthController::class,'logout']);
});

// ✅ 認証済みユーザー用ルート（要: auth:sanctum）
Route::middleware(['auth:sanctum','verified'])->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::get('/users', [UserController::class, 'searchByName']);
    Route::get('/users/{user_id}', [UserController::class, 'search']);
    Route::get('/friends', [FriendController::class, 'index']);
    Route::post('/friends/{id}', [FriendController::class, 'add']);
    Route::get('/messages/{friend_id}', [MessageController::class, 'index']);
    Route::post('/messages/{friend_id}', [MessageController::class, 'send']);
    Route::post('/profile',[UserController::class, 'update']);
});
