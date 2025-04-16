import { sendMessage, backToFriends } from '../services/messageService.js';
import { renderAuthorAndFriends } from '../views/renderAuthorAndFriends.js';
import { renderInvites } from '../views/renderInvites.js';
import { showView } from '../views/showView.js';

export const messageHandlers = {
    click: {
        '.send-button': async (el, e) => {
            e.preventDefault();
            await sendMessage();
        },
        '.back-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await backToFriends();
        },
        '.control-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('currentChatId');
            localStorage.removeItem('currentChatName');
            localStorage.removeItem('lastView');
            await renderInvites();
            await showView('control-view');
        },
        '.user-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('currentChatId');
            localStorage.removeItem('currentChatName');
            localStorage.removeItem('lastView');
            await renderAuthorAndFriends();
            await showView('auth-view');
        }
    }
}
