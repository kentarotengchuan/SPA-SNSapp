import { openChat } from '../services/messageService.js';
import { handleLogout } from '../services/userService.js';
import { renderAuthorAndFriends } from '../views/renderAuthorAndFriends.js';
import { renderInvites } from '../views/renderInvites.js';
import { showView } from '../views/showView.js';

export const friendHandlers = {
    click: {
        '.friend-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            const friendId = parseInt(el.dataset.id);
            const name = el.dataset.name;
            await openChat(friendId, name);
        },
        '.control-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await renderInvites();
            await showView('control-view');
        },
        '.user-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await renderAuthorAndFriends();
            await showView('auth-view');
        }
    }   
};