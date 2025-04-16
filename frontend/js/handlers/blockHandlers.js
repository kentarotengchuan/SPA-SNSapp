import { renderBlockedUsers } from "../views/renderBlockedUsers.js";
import { showView } from "../views/showView.js";
import { renderInvites } from "../views/renderInvites.js";
import { unblockFriends } from "../api/friends.js";

export const blockHandlers = {
    click: {
        '.unblock-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await unblockFriends(el.dataset.id);
            await renderBlockedUsers();
            await showView('block-view');
        },
        '.back-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await renderInvites();
            await showView('control-view');
        }
    }
}