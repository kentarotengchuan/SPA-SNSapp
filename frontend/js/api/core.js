const API_BASE = 'http://localhost:8000/api';
let csrfPromise = false;

export async function getCSRF() {
    if (!csrfPromise) {
        csrfPromise = fetch('http://localhost:8000/sanctum/csrf-cookie', {
            credentials: 'include',
        });
    }
    await csrfPromise;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

export function getHeaders(isJson = true) {
    const xsrf = getCookie('XSRF-TOKEN');
    const session = getCookie('laravel_session');
    const headers = {};
    if (xsrf) headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrf);
    if (isJson) {
        headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';
        headers['Cookie'] = `XSRF-TOKEN=${xsrf}; laravel_session=${session}`;
    }

    headers['X-Requested-With'] = 'XMLHttpRequest';
    return headers;
}

export async function apiGet(endpoint) {
    console.log('API GET:', endpoint);
    await getCSRF();
    const res = await fetch(API_BASE + endpoint, {
        method: 'GET',
        headers: getHeaders(),
        credentials: 'include',
    });
    return await res.json();
}

export async function apiPost(endpoint, body = {}) {
    await getCSRF();
    const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(body),
    });

    return await res.json();
}

export async function apiPostForm(endpoint, formData) {
    await getCSRF();
    const res = await fetch(API_BASE + endpoint, {
        method: 'POST',
        headers: getHeaders(false),
        credentials: 'include',
        body: formData,
    });
    return await res.json();
}