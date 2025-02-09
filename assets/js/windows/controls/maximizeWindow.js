export const setupMaximizeControls = () => {
    const maximizeButtons = document.querySelectorAll('.maximize--app');

    maximizeButtons.forEach(button => {
        let isMaximized = false; // Estado para rastrear si la ventana está maximizada
        let originalSize = {}; // Almacenar el tamaño y posición original de la ventana

        button.addEventListener('click', (event) => {
            event.preventDefault(); // Evitar comportamientos no deseados
            const windowElement = button.closest('.window');

            if (windowElement) {
                if (isMaximized) {
                    // Restaurar la ventana a su tamaño y posición original
                    windowElement.style.width = originalSize.width;
                    windowElement.style.height = originalSize.height;
                    windowElement.style.left = originalSize.left;
                    windowElement.style.top = originalSize.top;
                } else {
                    // Guardar el tamaño y posición original antes de maximizar
                    const rect = windowElement.getBoundingClientRect();
                    originalSize = {
                        width: windowElement.style.width,
                        height: windowElement.style.height,
                        left: windowElement.style.left,
                        top: windowElement.style.top,
                    };

                    // Maximizar la ventana
                    const { innerWidth, innerHeight } = window;
                    const taskbar = document.querySelector('.taskbar__container');
                    const taskbarHeight = taskbar ? taskbar.getBoundingClientRect().height : 0;

                    windowElement.style.width = `${innerWidth}px`;
                    windowElement.style.height = `${innerHeight - taskbarHeight}px`;
                    windowElement.style.left = '0px';
                    windowElement.style.top = `${taskbarHeight}px`;
                }

                isMaximized = !isMaximized; // Alternar el estado de maximizado
            }
        });

        // Soporte para pantallas táctiles
        button.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Evitar comportamientos no deseados
            button.click(); // Disparar el evento de clic
        });
    });
};