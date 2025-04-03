// 初期処理：ページ読み込み時にログイン済みかチェック
window.addEventListener('DOMContentLoaded', async () => {
    if (token) {
        try {
            const me = await apiGet('/user');
            localStorage.setItem('user_id', me.id);
            await loadFriends();
            showView('friends-view');
        } catch (e) {
            console.warn('トークンはあるが無効かも？', e);
            handleLogout(); // トークン破棄してログイン画面へ
        }
    } else {
        showView('login-view');
    }
});

function showView(viewId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
}

async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const res = await apiPost('/login', { email, password });

    if (res.token) {
        setToken(res.token);
        const me = await apiGet('/user');
        localStorage.setItem('user_id', me.id);
        await loadFriends();
        showView('friends-view');
    } else {
        alert('ログイン失敗');
    }
}

async function loadFriends() {
    const friends = await apiGet('/friends');
    const container = document.getElementById('friend-list');
    container.innerHTML = '';
    friends.forEach(f => {
        const btn = document.createElement('button');
        btn.textContent = f.name;
        btn.onclick = () => openChat(f.id, f.name);
        container.appendChild(btn);
    });
}

let currentFriendId = null;

async function openChat(friendId, name) {
    currentFriendId = friendId;
    document.getElementById('chat-with').textContent = `相手: ${name}`;
    showView('chat-view');

    const messages = await fetchMessages(friendId);
    renderMessages(messages);
}

function renderMessages(messages) {
    const box = document.getElementById('chat-box');
    box.innerHTML = '';
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = msg.sender_id === parseInt(localStorage.getItem('user_id'))
            ? 'message-me' : 'message-other';
        div.textContent = msg.message;
        box.appendChild(div);
    });
}

async function sendChatMessage() {
    const input = document.getElementById('message-input');
    const text = input.value;
    if (!text) return;

    await sendMessage(currentFriendId, text);
    input.value = '';
    const messages = await fetchMessages(currentFriendId);
    renderMessages(messages);
}

async function handleLogout() {
    await apiPost('/logout');
    localStorage.clear();
    //token = null;
    showView('login-view');
}

function backToFriends() {
    showView('friends-view');
}
