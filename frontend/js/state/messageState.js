let _currentChatId = localStorage.getItem('currentChatId') || null;
let _currentChatName = localStorage.getItem('currentChatName') || null;

export function setCurrentChatId(id) {
    _currentChatId = id;
    localStorage.setItem('currentChatId', id);
}

export function getCurrentChatId() {
    return _currentChatId;
}

export function setCurrentChatName(name) {
    _currentChatName = name;
    localStorage.setItem('currentChatName', name);
}

export function getCurrentChatName() {
    return _currentChatName;
}