<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Friendship;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $friends = Friendship::where('user_id', $userId)
            ->where('status', 'accepted')
            ->with('friend:id,name')
            ->get()
            ->pluck('friend');

        return response()->json($friends);
    }

    public function add($id)
    {
        $userId = auth()->id();

        if ($userId == $id) {
            return response()->json(['error' => '自分自身を追加できません'], 400);
        }

        $already = Friendship::where('user_id', $userId)
            ->where('friend_id', $id)
            ->exists();

        if ($already) {
            return response()->json(['error' => '既に申請済みです'], 400);
        }

        Friendship::create([
            'user_id' => $userId,
            'friend_id' => $id,
            'status' => 'accepted' // 仮にワンタップ追加に
        ]);

        // 双方向に登録（省略可能）
        Friendship::create([
            'user_id' => $id,
            'friend_id' => $userId,
            'status' => 'accepted'
        ]);

        return response()->json(['message' => 'フレンド追加完了']);
    }
}