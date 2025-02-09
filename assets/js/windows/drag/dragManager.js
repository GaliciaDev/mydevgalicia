import { handleWindowPositioning } from '../positioning.js';

export const createDragManager = () => {
    let currentWindow = null;
    let offsetX, offsetY;
    let taskbarHeight = 0;

    // Calcular la altura de la barra de tareas una sola vez
    const taskbar = document.querySelector('.taskbar__container');
    if (taskbar) {
        taskbarHeight = taskbar.getBoundingClientRect().height;
    }

    const getClientCoordinates = (event) => {
        const touchEvent = event.touches ? event.touches[0] : event;
        return {
            clientX: touchEvent.clientX,
            clientY: touchEvent.clientY,
        };
    };

    const startDrag = (event, window) => {
        currentWindow = window;
        const { clientX, clientY } = getClientCoordinates(event);
        const rect = window.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
    };

    const drag = (event) => {
        if (!currentWindow) return;

        const { clientX, clientY } = getClientCoordinates(event);
        const { innerWidth, innerHeight } = window;
        const { width, height } = currentWindow.getBoundingClientRect();

        // Limitar el movimiento dentro de los límites de la pantalla
        const maxX = innerWidth - width;
        const maxY = innerHeight - height;

        // Evitar que la ventana sobrepase la barra de tareas
        const minY = taskbarHeight;

        const newX = Math.max(0, Math.min(clientX - offsetX, maxX));
        const newY = Math.max(minY, Math.min(clientY - offsetY, maxY));

        // Usar requestAnimationFrame para mejor rendimiento
        requestAnimationFrame(() => {
            currentWindow.style.left = `${newX}px`;
            currentWindow.style.top = `${newY}px`;
        });
    };

    const endDrag = () => {
        if (currentWindow) {
            // Aplicar el posicionamiento solo al finalizar el arrastre
            handleWindowPositioning(currentWindow);
        }
        currentWindow = null;
    };

    return {
        startDrag,
        drag,
        endDrag,
    };
};