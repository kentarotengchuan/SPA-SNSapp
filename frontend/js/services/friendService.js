import { apiPost } from "../api/core.js";

export async function handleInvite(id) {
    const invite = await apiPost(`/friends/${id}`);
    const situation = invite.situation;
}

export async function BooleanInvited() {
    const buttons = document.querySelectorAll('.invite-button');
    buttons.forEach(async button => {
        const id = button.dataset.id;
        const boolean = await apiPost(`/friends/${id}?request=boolean`);
        const status = boolean.status;
        switch (status) {
            case 'yet':
                break;
            case 'pending':
                button.textContent = '既に申請済み';
                button.classList.add('red');
                button.disabled = true;
                break;
            case 'accepted':
                button.textContent = '既に友達です';
                button.classList.add('green');
                button.disabled = true;
                break;
            case 'blocked':
                button.textContent = 'ブロックされています';
                button.classList.add('red');
                button.disabled = true;
                break;
            default:
                break;
        }
    });
}