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

    if (document.querySelector('.slider-rooms__body')) {
        new Swiper('.slider-rooms__body', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 24,
            speed: 800,
            loop: true,
            watchOverflow: true,
            // loopAdditionalSlides: 1,
            preloadImages: false,
            parallax: true,
            pagination: {
                el: '.slider-rooms__dots',
                clickable: true,
            },
            navigation: {
                nextEl: '.slider-rooms .slider-arrow_next',
                prevEl: '.slider-rooms .slider-arrow_prev',
            }
        });
    }

    if (document.querySelector('.slider-tips__body')) {
        new Swiper('.slider-tips__body', {
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 32,
            speed: 800,
            loop: true,
            watchOverflow: true,
            preloadImages: false,
            parallax: true,
            pagination: {
                el: '.slider-tips__dots',
                clickable: true,
            },
            navigation: {
                nextEl: '.slider-tips .slider-arrow_next',
                prevEl: '.slider-tips .slider-arrow_prev',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1.1,
                    spaceBetween: 15
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is >= 992px
                992: {
                    slidesPerView: 3,
                    spaceBetween: 32
                }
            }
        });
    }
})