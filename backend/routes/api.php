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
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello from Laravel']);
});


// 認証不要ルート
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 認証必要ルート
Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // フレンド関連
    Route::get('/users', [UserController::class, 'search']); // 検索付き一覧
    Route::get('/friends', [FriendController::class, 'index']);
    Route::post('/friends/{id}', [FriendController::class, 'add']);

    // メッセージ
    Route::get('/messages/{friend_id}', [MessageController::class, 'index']);
    Route::post('/messages/{friend_id}', [MessageController::class, 'send']);
});
