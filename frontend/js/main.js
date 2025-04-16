import './event.js';
import { getCurrentChatId, getCurrentChatName } from './state/messageState.js';
import { handleLogout } from './services/userService.js';
import { renderFriends } from './views/renderFriends.js';
import { showView } from './views/showView.js';
import { openChat } from './services/messageService.js';
import { renderAuthorAndFriends } from './views/renderAuthorAndFriends.js';
import { fetchUser } from './api/users.js';
import { renderBlockedUsers } from './views/renderBlockedUsers.js';
import { renderInvites } from './views/renderInvites.js';


let initialized = false;
window.addEventListener('DOMContentLoaded', async () => {
    if (initialized) return;
    initialized = true;
    
    const lastView = localStorage.getItem('lastView');
    const chatId = getCurrentChatId();
    const chatName = getCurrentChatName();

    if (location.hash === '#/email-verified') {
        await showView('login-view');
    }
    if (lastView) {
        switch (lastView) {
            case 'friends-view':
                await renderFriends();
                await showView('friends-view');
                break;
            case 'chat-view':
                await openChat(chatId, chatName);
                break;
            case 'auth-view':
                await renderAuthorAndFriends();
                await showView('auth-view');
                break;
            case 'profile-view':
                let auth = await fetchUser();
                document.getElementById('name-input').value = auth.user.name;
                await showView('profile-view');
                break;
            case 'block-view':
                await renderBlockedUsers();
                await showView('block-view');
                break;
            case 'control-view':
                await renderInvites();
                await showView('control-view');
                break;
            default:
                await showView(lastView || 'login-view');
                break;
        }
    }
});

