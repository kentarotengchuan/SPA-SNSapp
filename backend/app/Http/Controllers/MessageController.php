<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Http\Controllers\Controller;

class MessageController extends Controller
{
    public function index($friendId)
    {
        $userId = auth()->id();

        $messages = Message::where(function ($q) use ($userId, $friendId) {
                $q->where('sender_id', $userId)
                  ->where('receiver_id', $friendId);
            })
            ->orWhere(function ($q) use ($userId, $friendId) {
                $q->where('sender_id', $friendId)
                  ->where('receiver_id', $userId);
            })
            ->orderBy('created_at')
            ->get();

        return response()->json($messages);
    }

    public function send(Request $request, $friendId)
    {
        $request->validate(['message' => 'required|string']);
        $message = Message::create([
            'sender_id'   => auth()->id(),
            'receiver_id' => $friendId,
            'message'     => $request->message,
        ]);

        return response()->json($message);
    }
}