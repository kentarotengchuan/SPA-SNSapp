import { fetchFriends } from '../api/friends.js';

export async function renderFriends() {
    const friends = await fetchFriends();

    const container = document.getElementById('friend-list');
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
}