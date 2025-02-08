export default function motionSystem() {
    let currentWindow = null;
    let offsetX, offsetY;

    const EVENTS = {
        MOUSE_DOWN: 'mousedown',
        TOUCH_START: 'touchstart',
        MOUSE_MOVE: 'mousemove',
        TOUCH_MOVE: 'touchmove',
        MOUSE_UP: 'mouseup',
        TOUCH_END: 'touchend',
    };

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

        // Obtener la altura real de la barra de tareas en píxeles
        const taskbar = document.querySelector('.taskbar__container');
        const taskbarHeight = taskbar ? taskbar.getBoundingClientRect().height : 0;

        // Limitar el movimiento dentro de los límites de la pantalla
        const maxX = innerWidth - width;
        const maxY = innerHeight - height;

        // Evitar que la ventana sobrepase la barra de tareas
        const minY = taskbarHeight; // La ventana no puede estar más arriba que la barra de tareas

        const newX = Math.max(0, Math.min(clientX - offsetX, maxX));
        const newY = Math.max(minY, Math.min(clientY - offsetY, maxY)); // Aplicar límite inferior

        currentWindow.style.left = `${newX}px`;
        currentWindow.style.top = `${newY}px`;
    };

    const endDrag = () => {
        currentWindow = null;
    };

    document.querySelectorAll('.window').forEach(window => {
        const titleApp = window.querySelector('.title__app');

        const startDragHandler = (event) => {
            event.preventDefault();
            startDrag(event, window);
        };

        titleApp.addEventListener(EVENTS.MOUSE_DOWN, startDragHandler);
        titleApp.addEventListener(EVENTS.TOUCH_START, startDragHandler);
    });

    document.addEventListener(EVENTS.MOUSE_MOVE, drag);
    document.addEventListener(EVENTS.TOUCH_MOVE, drag);

    document.addEventListener(EVENTS.MOUSE_UP, endDrag);
    document.addEventListener(EVENTS.TOUCH_END, endDrag);
}