import { renderAuthorAndFriends } from "../views/renderAuthorAndFriends.js";
import { showView } from "../views/showView.js";
import { renderFriends } from "../views/renderFriends.js"; 
import { handleLogout } from "../services/userService.js";
import { renderSpecificUser } from "../views/renderSpecificUser.js";
import { BooleanInvited, handleInvite } from "../services/friendService.js";
import { renderInvites } from "../views/renderInvites.js";
import { fetchUser } from "../api/users.js";
import { renderBlockedUsers } from "../views/renderBlockedUsers.js";

export const controlHandlers = {
    click: {
        '.user-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            document.getElementById('word-input').value = '';
            document.getElementById('users-box').innerHTML = '';
            await renderAuthorAndFriends();
            await showView('auth-view');
        },
        '.friends-button': async (el, e) => { 
            e.preventDefault();
            localStorage.removeItem('lastView');
            document.getElementById('word-input').value = '';
            document.getElementById('users-box').innerHTML = '';
            await renderFriends();
            await showView('friends-view');
        },
        '.destory-button': async (el, e) => {
            e.preventDefault();
            document.getElementById('word-input').value = '';
            document.getElementById('users-box').innerHTML = '';
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
            await handleLogout();
        },
        '.search-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await renderSpecificUser();
            await BooleanInvited();
            showView('control-view');
        },
        '.invite-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await handleInvite(el.dataset.id);
            await BooleanInvited();
            showView('control-view');
        },
        '.accept-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await handleInvite(el.dataset.id);
            await renderInvites();
            showView('control-view');
        },
        '.profile-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            document.getElementById('word-input').value = '';
            document.getElementById('users-box').innerHTML = '';
            let auth = await fetchUser();
            document.getElementById('name-input').value = auth.user.name;
            showView('profile-view');
        },
        '.block-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            document.getElementById('word-input').value = '';
            document.getElementById('users-box').innerHTML = '';
            await renderBlockedUsers();
            showView('block-view');
        }


    }
}
