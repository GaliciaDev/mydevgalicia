import { handleWindowPositioning } from '../events/positioning.js';
import { getClientCoordinates } from '../events/coordinates.js';
import { getTaskbarHeight } from '../events/taskbar.js';

export const createDragManager = () => {
    let currentWindow = null;
    let offsetX, offsetY;
    const taskbarHeight = getTaskbarHeight();

    const startDrag = (event, window) => {
        currentWindow = window;
        const { clientX, clientY } = getClientCoordinates(event);
        const rect = window.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;

        // Ajustar el tamaño de la ventana al comenzar a arrastrar si está en los bordes
        if (isWindowOnEdge(window)) {
            adjustWindowSize(window);
            console.log('Adjusting window size because it is on the edge');
        }
    };

    const drag = (event) => {
        if (!currentWindow) return;

        const { clientX, clientY } = getClientCoordinates(event);
        const { innerWidth, innerHeight } = window;
        const { width, height } = currentWindow.getBoundingClientRect();

        const maxX = innerWidth - width;
        const maxY = innerHeight - height;
        const minY = taskbarHeight;

        const newX = Math.max(0, Math.min(clientX - offsetX, maxX));
        const newY = Math.max(minY, Math.min(clientY - offsetY, maxY));

        requestAnimationFrame(() => {
            if (currentWindow) {
                currentWindow.style.left = `${newX}px`;
                currentWindow.style.top = `${newY}px`;
            }
        });
    };

    const endDrag = () => {
        if (currentWindow) {
            handleWindowPositioning(currentWindow);
            console.log('Window positioning handled');
        }
        currentWindow = null;
    };

    const adjustWindowSize = (window) => {
        window.style.width = '12vw'; // Ajustar a un tamaño más pequeño
        window.style.height = '15vh'; // Ajustar a un tamaño más pequeño
        console.log('Window size adjusted to smaller dimensions');
    };

    const isWindowOnEdge = (window) => {
        const rect = window.getBoundingClientRect();
        const { innerWidth } = window;
        if (rect.left <= 0) {
            console.log('Window is on the left edge');
            return true;
        } else if (rect.right >= innerWidth) {
            console.log('Window is on the right edge');
            return true;
        }
        return false;
    };

    return {
        startDrag,
        drag,
        endDrag,
    };
};