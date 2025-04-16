<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json(['message' => '登録完了']);
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => '認証失敗'], 401);
        }

        return response()->json(['token' => $token]);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'ログアウトしました']);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function search($userId){
        $user = User::findOrFail($userId);
        return response()->json($user);
    }

    public function searchByName(Request $request){
        $name = $request->input('name');
        $users = User::where('id','!=',auth()->user()->id)->where('name', 'like', '%' . $name . '%')->get();
        return response()->json($users);
    }

    public function update(Request $request) {
        $request->validate([
            'name' => 'required',
            'image' => 'max:4096|image',
        ]);

        $user = auth('web')->user();

        if ($request->has('name')) {
        $user->name = $request->input('name');
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/user_images');
            $user->img_path = basename($path);
        }

        $user->save();

        return response()->json(['message' => 'updated']);
    }
}