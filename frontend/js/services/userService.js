import { login, register, logout } from '../api/users.js';
import { renderFriends } from '../views/renderFriends.js';
import { showView } from '../views/showView.js';
import { apiGet } from '../api/core.js';
import { update } from '../api/users.js';

export async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const res = await login(email, password);
    if (res.result == 'failed') {
        console.log('login error');
    } else {
        await renderFriends();
        await showView('friends-view');
    }
}

export async function handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    await register(name, email, password);
    await showView('verify-view');
}

export async function handleLogout() {
    try {
        await logout();
    } catch (e) {
        console.warn('ログアウトAPI失敗:', e);
    } finally {
        localStorage.clear();
        showView('login-view');
    }
}

export async function handleUpdate() {
    const name = document.getElementById('name-input').value;
    const image = document.getElementById('image-input').files[0];
    if (!name) return alert('名前を入力してください');
    if (!image) {
        await update(name);
    } else {
        await update(name, image);
    }
}
