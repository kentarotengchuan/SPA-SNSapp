<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Friendship;

class FriendshipSeeder extends Seeder
{
    public function run(): void
    {
        \DB::table('friendships')->delete();
        \DB::statement("ALTER TABLE friendships AUTO_INCREMENT = 1");
        Friendship::updateOrCreate([
            'user_id' => 1,
            'friend_id' => 2,
            'status' => 'accepted',
        ]);
        Friendship::updateOrCreate( [
            'user_id' => 2,
            'friend_id' => 1,
            'status' => 'accepted',
        ]);
    }
}