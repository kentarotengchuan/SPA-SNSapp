export function showView(viewId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));

    document.getElementById(viewId).classList.remove('hidden');

    localStorage.setItem('lastView', viewId);
}