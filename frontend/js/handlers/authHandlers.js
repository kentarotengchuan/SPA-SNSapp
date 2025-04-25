import { handleLogin, handleRegister } from '../services/userService.js';
import { showView } from '../views/showView.js';

export const authHandlers = {
    click: {
        '.login-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await handleLogin();
        },
        '.register-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await handleRegister();
        },
        '.login-link': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            await showView('login-view');
        },
        '.register-link': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
            await showView('register-view');
        }
    }
}