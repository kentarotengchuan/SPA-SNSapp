import { fetchBlockedUsers } from "../api/friends.js";
import { fetchUser } from "../api/users.js";


export async function renderBlockedUsers() {
    const me = await fetchUser();
    const container = document.getElementById('block-box');
    container.innerHTML = '';

    const blockedUsers = await fetchBlockedUsers();
    Array.from(blockedUsers).forEach(f => {
        const div = document.createElement('div');
        div.className = 'userForm';

        const userDiv = document.createElement('div');
        userDiv.className = 'user-info';

        const img = document.createElement('img');
        img.className = 'user-image';
        if (!f.img_path) {
            img.src = 'http://localhost:8000/storage/user_images/emp.png';
        } else {
            img.src = `http://localhost:8000/storage/user_images/${f.img_path}`;
        }
        userDiv.appendChild(img);

        const name = document.createElement('span');
        name.className = 'userName';
        name.textContent = f.name;
        userDiv.appendChild(name);

        div.appendChild(userDiv);

        const btn = document.createElement('button');
        btn.className = 'unblock-button';
        btn.textContent = 'ブロックを解除';
        btn.dataset.id = f.id;
        btn.dataset.name = f.name;
        div.appendChild(btn);

        container.appendChild(div);
    });
}