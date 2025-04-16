<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Auth\Events\Registered;
use \Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;



class AuthController extends Controller
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

        auth('web')->login($user);

        event(new Registered($user));

        return response()->json(['message' => '登録完了']);
    }

    public function getLogin(){
        return response()->json(['message' => 'ログイン画面へ']);
    }

    public function login(Request $request)
    {
    $credentials = $request->only(['email', 'password']);

    if (!Auth::guard('web')->attempt($credentials)) {
        return response()->json(['result' => 'failed'], 401);
    }

    $user = auth()->user();

    return response()->json(['result' => 'success']);
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'ログアウトしました']);
    }

    public function me(Request $request)
    {
        return response()->json(['user' => Auth::user()]);
    }

    public function verify(Request $request)
    {
        $user = User::findOrFail($request->route('id'));

    if (! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
        abort(403);
    }

    if (!$user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
        event(new Verified($user));
    }
    //return response()->json(['message' => '認証完了']);
    return redirect('http://localhost:3000/#/email-verified');
    }

    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Already verified']);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification link sent']);
    }
}