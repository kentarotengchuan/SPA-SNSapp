import { setCurrentUser, getCurrentUser } from '../state/userState.js';
import { apiGet, apiPost, apiPostForm, getHeaders } from './core.js';


export async function login(email, password) {
    const res = await apiPost('/login', { email, password });
    return res;
}

export async function register(name, email, password) {
    const res = await apiPost('/register', { name, email, password });
    return res;
}

export async function logout() {
    return await apiPost('/logout');
}

export async function fetchUser() {
    return await apiGet('/user');

}

export async function searchUser($userId) {
    return await apiGet(`/users/${$userId}`);
}

export async function searchUserByName($name) {
    return await apiGet(`/users?name=${$name}`);
}

export async function resendEmail() {
    return await fetch('http://localhost:8000/email/verification-notification', {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
    });
}

export async function update(name, image) {
    const form = new FormData();
    form.append('name', name);
    form.append('image', image);

    return await apiPostForm('/profile', form);
}