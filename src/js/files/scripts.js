import { isMobile } from './functions.js';

window.onload = function () {
    document.addEventListener('click', documentActions)

    function documentActions(e) {
        const targetElements = e.target;
        // isMobile - detect if device has touch screen
        if (window.innerWidth > 768 && isMobile.any()) {
            if (targetElements.classList.contains('menu__arrow')) {
                // closest - return closest parent with a class:
                targetElements.closest('.menu__item').classList.toggle('_hover');
            }
            if (!targetElements.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
                const hoveredElems = document.querySelectorAll('.menu__item._hover');
                for (let i = 0; i < hoveredElems.length; i++) {
                    hoveredElems[i].classList.remove('_hover');
                }
            }
        }
    }
}