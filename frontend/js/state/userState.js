let _currentUser = localStorage.getItem('currentUser') || null;

export function setCurrentUser(user) {
    _currentUser = user;
    localStorage.setItem('currentUser', user);
}

export function getCurrentUser() {
    return _currentUser;
}