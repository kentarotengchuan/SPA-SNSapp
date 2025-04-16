import { renderUserModal, openUserModal, closeUserModal } from '../views/controlModal.js';
import { openChat } from '../services/messageService.js';
import { renderFriends } from '../views/renderFriends.js';
import { showView } from '../views/showView.js';
import { renderInvites } from '../views/renderInvites.js';
import { fetchUser } from '../api/users.js';
import { renderAuthorAndFriends } from '../views/renderAuthorAndFriends.js';
import { blockFriends } from '../api/friends.js';

export const userHandlers = {
    click: {
        '.author-button': async (el, e) => {
            e.preventDefault();
            renderUserModal(parseInt(el.dataset.id));
            await openUserModal();
        },
        '.friend-button': async (el, e) => {
            e.preventDefault();
            await renderUserModal(parseInt(el.dataset.id));
            await openUserModal();
        },
        '.message-button': async (el, e) => { 
            e.preventDefault();
            localStorage.removeItem('lastView');
            await closeUserModal();
            const friendId = parseInt(el.dataset.id);
            const name = el.dataset.name;
            await openChat(friendId, name);
        },
        '.close-button': async (el, e) => {
            await closeUserModal();
        },
        '.control-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await closeUserModal();
            await renderInvites();
            await showView('control-view');
        },
        '.friends-button': async (el, e) => { 
            e.preventDefault();
            localStorage.removeItem('lastView');
            await closeUserModal();
            await renderFriends();
            await showView('friends-view');
        },
        '.profile-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await closeUserModal();
            let auth = await fetchUser();
            document.getElementById('name-input').value = auth.user.name;
            showView('profile-view');
        },
        '.block-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await closeUserModal();
            await blockFriends(el.dataset.id);
            await renderAuthorAndFriends();
            await showView('auth-view');
        }
    }
}