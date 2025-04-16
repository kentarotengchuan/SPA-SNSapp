import { fetchUser } from '../api/users.js'; 

export async function renderMessages(messages) {
    const me = await fetchUser();
    const box = document.getElementById('chat-box');
    box.innerHTML = '';
    Array.from(messages).forEach(msg => {
        const div = document.createElement('div');
        div.className = msg.sender_id === me.user.id
            ? 'message-me' : 'message-other';
        div.textContent = msg.message;
        box.appendChild(div);
    });
}