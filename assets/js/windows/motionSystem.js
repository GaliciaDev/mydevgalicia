import { createDragManager } from './drag/dragManager.js';
import { createEventManager } from './events/eventManager.js';

export default function motionSystem() {
    const dragManager = createDragManager();
    const eventManager = createEventManager(dragManager);

    eventManager.setupEventListeners();
}