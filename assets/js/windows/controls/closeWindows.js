export const setupCloseControls = () => {
    const closeButtons = document.querySelectorAll('.close--app');

    const closeWindow = (button) => {
        const windowElement = button.closest('.window');
        if (windowElement) {
            windowElement.style.transition = 'opacity 0.3s';
            windowElement.style.opacity = '0';
            setTimeout(() => {
                windowElement.remove();
            }, 300);
        }
    };

    closeButtons.forEach(button => {
        // Evento para clic (ratón)
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Evitar comportamientos no deseados
            closeWindow(button);
        });

        // Evento para touch (pantallas táctiles)
        button.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Evitar comportamientos no deseados
            closeWindow(button);
        });
    });
};