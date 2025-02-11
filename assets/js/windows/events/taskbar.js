export const getTaskbarHeight = () => {
    const taskbar = document.querySelector('.taskbar__container');
    return taskbar ? taskbar.getBoundingClientRect().height : 0;
};