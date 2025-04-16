import { handleUpdate } from "../services/userService.js";
import { renderAuthorAndFriends } from "../views/renderAuthorAndFriends.js";
import { renderInvites } from "../views/renderInvites.js";
import { showView } from "../views/showView.js";

export const profileHandlers = {
    click: {
        '.submit-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await handleUpdate();
            await renderAuthorAndFriends();
            await showView('auth-view');
        },
        '.back-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await renderInvites();
            await showView('control-view');
        }
    }
}