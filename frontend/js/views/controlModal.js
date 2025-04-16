import { fetchUser, searchUser } from "../api/users.js";

export async function renderUserModal(userId) {
    const me = await fetchUser();

    const modal = document.getElementById('modal-content');
    modal.innerHTML = '';
    
    if (userId == me.user.id) {
        const btnDiv = document.createElement('div');
        btnDiv.className = 'btn-inner';

        const close = document.createElement('button');
        close.className = 'close-button';
        close.textContent = '×';
        btnDiv.appendChild(close);

        modal.appendChild(btnDiv);

        const img = document.createElement('img');
        img.className = 'modal-image';
        if (!me.user.img_path) {
            img.src = 'http://localhost:8000/storage/user_images/emp.png';
        } else {
            img.src = `http://localhost:8000/storage/user_images/${me.user.img_path}`;
        }
        modal.appendChild(img);

        const username = document.createElement('h3');
        username.className = 'modal-name';
        username.textContent = me.user.name;
        modal.appendChild(username);

        const btns = document.createElement('div');
        btns.className = 'modal-buttons';

        const btn = document.createElement('button');
        btn.className = 'profile-button';
        btn.textContent = 'プロフィールへ';
        btns.appendChild(btn);

        modal.appendChild(btns);
    } else {
        const friend = await searchUser(userId);

        const btnDiv = document.createElement('div');
        btnDiv.className = 'btn-inner';

        const close = document.createElement('button');
        close.className = 'close-button';
        close.textContent = '×';
        btnDiv.appendChild(close);

        modal.appendChild(btnDiv);

        const img = document.createElement('img');
        img.className = 'modal-image';
        if (!friend.img_path) {
            img.src = 'http://localhost:8000/storage/user_images/emp.png';
        } else {
            img.src = `http://localhost:8000/storage/user_images/${friend.img_path}`;
        }
        modal.appendChild(img);
        
        const username = document.createElement('h3');
        username.className = 'modal-name';
        username.textContent = friend.name;
        modal.appendChild(username);

        const btns = document.createElement('div');
        btns.className = 'modal-buttons';

        const btn = document.createElement('button');
        btn.className = 'message-button';
        btn.textContent = 'トークへ';
        btn.dataset.id = friend.id;
        btn.dataset.name = friend.name;
        btns.appendChild(btn);

        const btnBlock = document.createElement('button');
        btnBlock.className = 'block-button';
        btnBlock.textContent = 'ブロック';
        btnBlock.dataset.id = friend.id;
        btnBlock.dataset.name = friend.name;
        btns.appendChild(btnBlock);

        modal.appendChild(btns);
    }
}
export async function openUserModal() {
    const modal = document.getElementById('user-modal');
    modal.classList.remove('hidden');
}
export async function closeUserModal() {
    const modal = document.getElementById('user-modal');
    modal.classList.add('hidden');
}