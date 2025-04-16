import { apiGet, apiPost, } from './core.js';

export async function fetchFriends(){
    return await apiGet('/friends');
}

export async function fetchInvites() {
    return await apiGet('/friends?status=pending');
}

export async function fetchBlockedUsers() {
    return await apiGet('/friends?status=blocked');
}

export async function addFriends(friendId) {
    await apiPost(`/friends/${friendId}`);
}

export async function blockFriends(friendId) {
    await apiPost(`/friends/${friendId}?request=block`);
}

export async function unblockFriends(friendId) {
    await apiPost(`/friends/${friendId}?request=unblock`);
}


