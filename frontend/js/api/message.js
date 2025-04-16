import { apiGet, apiPost } from './core.js';

export async function fetchMessages(friendId){
    return await apiGet(`/messages/${friendId}`);
}

export async function postMessages(friendId, message) {
    return await apiPost(`/messages/${friendId}`, {
        message: message
    });
}