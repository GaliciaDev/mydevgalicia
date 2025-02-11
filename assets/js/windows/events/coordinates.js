export const getClientCoordinates = (event) => {
    const touchEvent = event.touches ? event.touches[0] : event;
    return {
        clientX: touchEvent.clientX,
        clientY: touchEvent.clientY,
    };
};