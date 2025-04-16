import { fetchInvites } from "../api/friends.js";

export async function renderInvites() {
    const box = document.getElementById('invites-box');
    box.innerHTML = '';

    const invites = await fetchInvites();
    Array.from(invites).forEach(invite => {
        const div = document.createElement('div');
        div.className = 'userForm';

        const userDiv = document.createElement('div');
        userDiv.className = 'user-info';

        const img = document.createElement('img');
        img.className = 'user-image';
        if (!invite.img_path) {
            img.src = 'http://localhost:8000/storage/user_images/emp.png';
        } else {
            img.src = `http://localhost:8000/storage/user_images/${invite.img_path}`;
        }
        userDiv.appendChild(img);

        const name = document.createElement('span');
        name.className = 'inviteName';
        name.textContent = invite.name;
        name.dataset.id = invite.id;
        userDiv.appendChild(name);

        div.appendChild(userDiv);

        const button = document.createElement('button');
        button.className = 'accept-button';
        button.textContent = '承認する';
        button.dataset.id = invite.id;
        div.appendChild(button);

        box.appendChild(div);
    });

}