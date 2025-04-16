export function delegate(containerId, config) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (const eventType in config) {
        container.addEventListener(eventType, (e) => {
            for (const selector in config[eventType]) {
                const el = e.target.closest(selector);
                if (el && container.contains(el)) {
                    config[eventType][selector](el, e);
                    break;
                }
            }
        });
    }
}