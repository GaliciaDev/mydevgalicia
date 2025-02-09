export const createEventManager = (dragManager) => {
    const EVENTS = {
        MOUSE_DOWN: 'mousedown',
        TOUCH_START: 'touchstart',
        MOUSE_MOVE: 'mousemove',
        TOUCH_MOVE: 'touchmove',
        MOUSE_UP: 'mouseup',
        TOUCH_END: 'touchend',
    };

    const setupEventListeners = () => {
        document.querySelectorAll('.window').forEach(window => {
            const titleApp = window.querySelector('.title__app');

            const startDragHandler = (event) => {
                event.preventDefault();
                dragManager.startDrag(event, window);
            };

            titleApp.addEventListener(EVENTS.MOUSE_DOWN, startDragHandler);
            titleApp.addEventListener(EVENTS.TOUCH_START, startDragHandler);
        });

        document.addEventListener(EVENTS.MOUSE_MOVE, dragManager.drag);
        document.addEventListener(EVENTS.TOUCH_MOVE, dragManager.drag);

        document.addEventListener(EVENTS.MOUSE_UP, dragManager.endDrag);
        document.addEventListener(EVENTS.TOUCH_END, dragManager.endDrag);
    };

    return {
        setupEventListeners,
    };
};