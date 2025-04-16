import { logout, resendEmail } from "../api/users.js";
import { showView } from "../views/showView.js";

export const verifyHandlers = {
    click: {
        '.resend-button': async (el, e) => {
            e.preventDefault();
            await resendEmail();
            localStorage.removeItem('lastView');
            document.getElementById('resend-message').textContent = '認証メールを再送しました。ご確認ください';
        },
        '.logout-button': async (el, e) => {
            e.preventDefault();
            localStorage.removeItem('lastView');
            await logout();
            showView('login-view');
        }
        
    }
}