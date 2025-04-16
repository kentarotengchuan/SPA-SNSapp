import { fetchMessages, postMessages } from '../api/message.js';
import { setCurrentChatId, getCurrentChatId, setCurrentChatName, } from '../state/messageState.js';
import { showView } from '../views/showView.js';
import { renderMessages } from '../views/renderMessages.js';
import { renderFriends } from '../views/renderFriends.js';

export async function openChat(friendId, name) {
    setCurrentChatId(friendId);
    setCurrentChatName(name);

    const chatWith = document.getElementById('chat-with');
    if (chatWith) chatWith.textContent = `${name}`;

    showView('chat-view');

    const messages = await fetchMessages(friendId);

    renderMessages(messages);
}

export async function sendMessage() {
    const input = document.getElementById('message-input');
    const text = input?.value;
    if (!text) return;

    const friendId = getCurrentChatId();

    await postMessages(friendId,text);

    input.value = '';

    const messages = await fetchMessages(friendId);

    renderMessages(messages);
}

export function backToFriends() {
    localStorage.removeItem('currentChatId');
    localStorage.removeItem('currentChatName');
    renderFriends();
    showView('friends-view');
}