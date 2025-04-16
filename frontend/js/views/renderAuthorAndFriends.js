import { fetchUser } from "../api/users.js";
import { fetchFriends } from '../api/friends.js';

let isRendering = false;
export async function renderAuthorAndFriends() {
    if (isRendering) return;
    isRendering = true;

    try {
        const me = await fetchUser();
        const authContainer = document.getElementById('auth-container');
        authContainer.innerHTML = '';
        const btnAuth = document.createElement('button');
        btnAuth.className = 'author-button';
        btnAuth.dataset.id = me.user.id;
        btnAuth.dataset.name = me.user.name;

        const imgAuth = document.createElement('img');
        imgAuth.className = 'user-image';
        if (!me.user.img_path) {
            imgAuth.src = 'http://localhost:8000/storage/user_images/emp.png';
        } else {
            imgAuth.src = `http://localhost:8000/storage/user_images/${me.user.img_path}`;
        }
        btnAuth.appendChild(imgAuth);

        const nameAuth = document.createElement('span');
        nameAuth.textContent = me.user.name;
        btnAuth.appendChild(nameAuth);

        authContainer.appendChild(btnAuth);

        const friends = await fetchFriends();
        const container = document.getElementById('friend-list-in-auth');
        container.innerHTML = '';
        Array.from(friends).forEach(f => {
            const btn = document.createElement('button');
            btn.className = 'friend-button';
            btn.dataset.id = f.id;
            btn.dataset.name = f.name;
            const img = document.createElement('img');
            img.className = 'user-image';
            if (!f.img_path) {
                img.src = 'http://localhost:8000/storage/user_images/emp.png';
            } else {
                img.src = `http://localhost:8000/storage/user_images/${f.img_path}`;
            }
            btn.appendChild(img);

            const name = document.createElement('span');
            name.textContent = f.name;
            btn.appendChild(name);

            container.appendChild(btn);
        });
    } catch (e) {
        console.error('renderAuthorAndFriends error', e);
    } finally {
        isRendering = false;
    }
}