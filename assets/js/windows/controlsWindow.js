import { setupCloseControls } from './controls/closeWindows.js';
import { setupMaximizeControls } from './controls/maximizeWindow.js';

export function controlsWindow() {
    console.log('Window controls loaded');

    // Inicializar los controles de cerrar y maximizar
    setupCloseControls();
    setupMaximizeControls();
}