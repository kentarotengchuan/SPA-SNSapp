<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Friendship;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();

        if ($request->filled('status')) {
            if($request->input('status') == 'blocked'){
                $status = $request->input('status');
                $friends = Friendship::where('user_id', $userId)
                ->where('status', $status)
                ->with('friend:id,name,img_path')
                ->get()
                ->pluck('friend');
                return response()->json($friends);
            }
            $status = $request->input('status');
            $friends = Friendship::where('friend_id', $userId)
                ->where('status', $status)
                ->with('user:id,name,img_path')
                ->get()
                ->pluck('user');
            return response()->json($friends);
        }

        $friends = Friendship::where('user_id', $userId)
            ->where('status', 'accepted')
            ->with('friend:id,name,img_path')
            ->get()
            ->pluck('friend');

        return response()->json($friends);
    }

    public function add(Request $request, $id)
    {
        $userId = auth()->id();
        $already = Friendship::where('user_id',$userId)
            ->where('friend_id',$id)
            ->first();
        $reverse = Friendship::where('user_id', $id)
            ->where('friend_id', $userId)
            ->first();
        if ($request->filled('request')) {
            switch ($request->input('request')) {
                case 'boolean': 
                    if ( $already ) {
                        return response()->json(['status' => "$already->status"]);
                    } else {
                        return response()->json(['status' => 'yet']);
                    }
                case 'block':
                    if ( $already ) {
                        $already->status = 'blocked';
                        $already->save();
                        return response()->json(['message' => "success blocked"]);
                    } else {
                        return response()->json(['message' => 'failed blocked']);
                    }
                case 'unblock':
                    if ( $already ) {
                        $already->delete();
                        $reverse->delete();
                        return response()->json(['message' => "success unblocked"]);
                    } else {
                        return response()->json(['message' => 'failed unblocked']);
                    }    
            }
        }

        

        if ($userId == $id) {
            return response()->json(['error' => '自分自身を追加できません'], 400);
        }

        
        if ($already) {
            return response()->json(['situation' => 'already-invited']);
        } 

                
        if ($reverse) {
            switch($reverse->status) {
                case 'pending':
                    Friendship::create([
                        'user_id' => $userId,
                        'friend_id' => $id,
                        'status' => 'accepted'
                    ]);
                    $reverse->status = 'accepted';
                    $reverse->save();
                    return response()->json(['situation' => 'accepted']);
                    break;
                case 'accepted':
                    return response()->json(['situation' => 'already-accepted']);
                    break;
                case 'blocked':
                    return response()->json(['situation' => 'blocked']);
                    break;
            }
        } else {
            Friendship::create([
                'user_id' => $userId,
                'friend_id' => $id,
                'status' => 'pending'
            ]);
            return response()->json(['situation' => 'invited']);
        }
            
        return response()->json(['message' => 'フレンド追加完了']);
    }
}