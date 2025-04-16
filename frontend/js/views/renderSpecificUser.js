import { searchUserByName } from "../api/users.js";

export async function renderSpecificUser() {
    const word = document.getElementById('word-input')?.value;
    if (!word) return;
    const box = document.getElementById('users-box');
    box.innerHTML = '';
   
    const users = await searchUserByName(word);
    Array.from(users).forEach(user => {
        const div = document.createElement('div');
        div.className = 'userForm';

        const userDiv = document.createElement('div');
        userDiv.className = 'user-info';

        const img = document.createElement('img');
        img.className = 'user-image';
        if (!user.img_path) {
            img.src = 'http://localhost:8000/storage/user_images/emp.png';
        } else {
            img.src = `http://localhost:8000/storage/user_images/${user.img_path}`;
        }
        userDiv.appendChild(img);

        const name = document.createElement('span');
        name.className = 'userName';
        name.textContent = user.name;
        name.dataset.id = user.id;
        userDiv.appendChild(name);

        div.appendChild(userDiv);

        const button = document.createElement('button');
        button.className = 'invite-button';
        button.textContent = '申請する';
        button.dataset.id = user.id;
        div.appendChild(button);

        box.appendChild(div);
    });

}