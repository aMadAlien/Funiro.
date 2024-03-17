let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (slider.classList.contains("swiper-bild")) {
            let sliderItems = slider.children;
            if (sliderItems) {
                for (let i = 0; i < sliderItems.length; i++) {
                    let el = sliderItems[i];
                    el.classList.add("swiper-slide");
                }
            }

            let sliderContent = slider.innerHTML;

            let sliderWrapper = document.createElement('div');
            sliderWrapper.classList.add('swiper-wrapper');
            sliderWrapper.innerHTML = sliderContent;

            slider.innerHTML = '';
            slider.appendChild(sliderWrapper);
            slider.classList.add("swiper-bild");

            if (slider.classList.contains("swiper-scroll")) {
                let sliderScroll = document.createElement('div');
                sliderScroll.classList.add("swiper-scrollbar");
                slider.appendChild(sliderScroll);
            }
        }
    }
}



document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.slider-main__body')) {
        new Swiper('.slider-main__body', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 32,
            watchOverflow: true,
            speed: 800,
            loop: true,
            // loopAdditionalSlides: 5,
            preloadImages: false,
            parallax: true,
            pagination: {
                el: '.controls-slider-main__dots',
                clickable: true,
            },
            navigation: {
                nextEl: '.slider-main .slider-arrow_next',
                prevEl: '.slider-main .slider-arrow_prev',
            }
        });
    }
})