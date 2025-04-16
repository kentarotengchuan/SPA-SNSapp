import { delegate } from './delegate.js';
import { authHandlers } from './handlers/authHandlers.js';
import { messageHandlers } from './handlers/messageHandlers.js';
import { userHandlers } from './handlers/userHandlers.js';
import { friendHandlers } from './handlers/friendHandlers.js';
import { controlHandlers } from './handlers/controlHandlers.js';
import { profileHandlers } from './handlers/profileHandlers.js';
import { blockHandlers } from './handlers/blockHandlers.js';
import { verifyHandlers } from './handlers/verifyHandlers.js';


delegate('login-view', authHandlers);

delegate('register-view', authHandlers);

delegate('chat-view', messageHandlers);

delegate('friends-view', friendHandlers);

delegate('auth-view', userHandlers);

delegate('control-view', controlHandlers);

delegate('profile-view', profileHandlers);

delegate('block-view', blockHandlers);

delegate('verify-view', verifyHandlers);