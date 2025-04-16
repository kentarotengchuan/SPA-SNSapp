const API_BASE = 'http://localhost:8000/api'; // Laravel側のAPIルート
let token = localStorage.getItem('token') || null;

function setToken(newToken) {
    token = newToken;
    localStorage.setItem('token', newToken);
}

function getHeaders(isJson = true) {
    const headers = {};
    if (token) headers['Authorization'] = 'Bearer ' + token;
    if (isJson) headers['Content-Type'] = 'application/json';
    return headers;
}

async function apiGet(endpoint) {
    const res = await fetch(API_BASE + endpoint, {
        method: 'GET',
        headers: getHeaders(),
        credentials: 'include',
    });
    return await res.json();
}

async function apiPost(endpoint, body = {}) {
    const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(body),
    });
    return await res.json();
}

async function apiPostForm(endpoint, formData) {
    const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: getHeaders(false),
        credentials: 'include',
        body: formData,
    });
    return await res.json();
}