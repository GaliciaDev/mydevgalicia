export const handleWindowPositioning = (windowElement) => {
    if (!windowElement || !windowElement.getBoundingClientRect) {
        console.error("Invalid window element provided.");
        return;
    }

    const { left, right } = windowElement.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;
    const taskbar = document.querySelector('.taskbar__container');
    const taskbarHeight = taskbar ? taskbar.getBoundingClientRect().height : 0;

    // Si la ventana está cerca del borde izquierdo
    if (left <= 0) {
        windowElement.style.width = `${innerWidth / 2}px`;
        windowElement.style.height = `${innerHeight - taskbarHeight}px`;
        windowElement.style.left = `0px`;
        windowElement.style.top = `${taskbarHeight}px`;
    }
    // Si la ventana está cerca del borde derecho
    else if (right >= innerWidth) {
        windowElement.style.width = `${innerWidth / 2}px`;
        windowElement.style.height = `${innerHeight - taskbarHeight}px`;
        windowElement.style.left = `${innerWidth / 2}px`;
        windowElement.style.top = `${taskbarHeight}px`;
    }
};