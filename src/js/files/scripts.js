import { isMobile, ibg } from './functions.js';

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
        if (targetElements.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active')
        } else if (!targetElements.closest('.search-form') && document.querySelector('.search-form._active')) {
            document.querySelector('.search-form').classList.remove('_active')
        }
        if (targetElements.classList.contains('icon-menu')) {
            targetElements.classList.toggle('_active');
            document.querySelector('.menu__body').classList.toggle('_active');
        }
        if (targetElements.classList.contains('products__more')) {
            getProducts(targetElements);
            e.preventDefault();
        }
        if (targetElements.classList.contains('action-product__button')) {
            const productId = targetElements.closest('.item-product').dataset.pid;
            addToCart(targetElements, productId);
            e.preventDefault();
        }
        if (targetElements.classList.contains('cart-header__icon' || targetElements.closest('.cart-header_icon'))) {
            if (document.querySelector('.cart-list').children.length > 0) {
                document.querySelector('.cart-header').classList.toggle('_active');
            }
            e.preventDefault();
        } else if (!targetElements.closest('.cart-header') && !targetElements.classList.contains('action-product__button')) {
            console.log("remove");
            document.querySelector('.cart-header').classList.remove('_active');
        }
        if (targetElements.classList.contains('cart-list__delete')) {
            const productId = targetElements.closest('.cart-list__item').dataset.cartPid;
            updateCart(targetElements, productId, false);
            e.preventDefault();
        }
        ibg();
    }

    const headerElem = document.querySelector('.header')

    const callback = function (entries, observer) {
        if (entries[0].isIntersecting) {
            headerElem.classList.remove('_scroll');
        } else {
            headerElem.classList.add('_scroll');
        }
    }

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElem);

    async function getProducts(button) {
        if (!button.classList.contains('_hold')) {
            button.classList.add('_hold');
            const file = 'json/products.json';
            let response = await fetch(file, {
                method: 'GET'
            });
            if (response.ok) {
                let result = await response.json();
                loadProducts(result);
                button.classList.remove('_hold');
                button.remove();
            } else {
                alert('Error!');
            }
        }
    }

    function loadProducts(data) {
        const productsItems = document.querySelector('.products__items');

        data.products.forEach(item => {
            const productId = item.id;
            const productUrl = item.url;
            const productImage = item.image;
            const productTitle = item.title;
            const productText = item.text;
            const productPrice = item.price;
            const productOldPrice = item.oldPrice;
            const productShareUrl = item.shareurl;
            const productLikeUrl = item.likeurl;
            const productLabels = item.labels;

            let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
            let productTemplateEnd = `</article>`;

            let productTemplateLabels = '';
            if (productLabels) {
                let productTemplateLabelsStart = `<div class="item-product__labels">`;
                let productTemplateLabelsEnd = `</div>`;
                let productTemplateLabelsContent = '';

                productLabels.forEach(labelItem => {
                    productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
                });

                productTemplateLabels += productTemplateLabelsStart;
                productTemplateLabels += productTemplateLabelsContent;
                productTemplateLabels += productTemplateLabelsEnd;
            }

            let productTemplateImage = `
                <a href="${productUrl}" class="item-product__image _ibg">
                    <img src="img/products/${productImage}" alt="${productTitle}">
                </a>
            `;

            let productTemplateBodyStart = `<div class="item-product__body">`;
            let productTemplateBodyEnd = `</div>`;

            let productTemplateContent = `
                <div class="item-product__content">
                    <h3 class="item-product__title">${productTitle}</h3>
                    <div class="item-product__text">${productText}</div>
                </div>
            `;

            let productTemplatePrices = '';
            let productTemplatePricesStart = `<div class="item-product__prices">`;
            let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
            let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
            let productTemplatePricesEnd = `</div>`;

            productTemplatePrices = productTemplatePricesStart;
            productTemplatePrices += productTemplatePricesCurrent;
            if (productOldPrice) {
                productTemplatePrices += productTemplatePricesOld;
            }
            productTemplatePrices += productTemplatePricesEnd;

            let productTemplateActions = `
                <div class="item-product__actions actions-product">
                    <div class="action-product__body">
                        <a href="" class="action-product__button btn btn_white">Add to cart</a>
                        <a href="${productShareUrl}" class="action-product__link icon-share">Share</a>
                        <a href="${productLikeUrl}" class="action-product__link icon-favorite">Like</a>
                    </div>
                </div>
            `;

            let productTemplateBody = '';
            productTemplateBody += productTemplateBodyStart;
            productTemplateBody += productTemplateContent;
            productTemplateBody += productTemplatePrices;
            productTemplateBody += productTemplateActions;
            productTemplateBody += productTemplateBodyEnd;

            let productTemplate = '';
            productTemplate += productTemplateStart;
            productTemplate += productTemplateLabels;
            productTemplate += productTemplateImage;
            productTemplate += productTemplateBody;
            productTemplate += productTemplateEnd;

            productsItems.insertAdjacentHTML('beforeend', productTemplate)
            ibg()
        });
    }

    function addToCart(productButon, productId) {
        if (!productButon.classList.contains('_hold')) {
            productButon.classList.add('_hold');
            productButon.classList.add('_fly');

            const cart = document.querySelector('.cart-header__icon');
            const product = document.querySelector(`[data-pid="${productId}"]`);
            const productImage = product.querySelector('.item-product__image');

            const productImageFly = productImage.cloneNode(true);

            const productImageFlyWidth = productImage.offsetWidth;
            const productImageFlyHeight = productImage.offsetHeight;
            const productImageFlyTop = productImage.getBoundingClientRect().top;
            const productImageFlyLeft = productImage.getBoundingClientRect().left;

            productImageFly.setAttribute('class', '_flyImage _ibg');
            productImageFly.style.cssText = `
                left: ${productImageFlyLeft}px;
                top: ${productImageFlyTop}px;
                width: ${productImageFlyWidth}px;
                height: ${productImageFlyHeight}px;
            `;

            document.body.append(productImageFly);

            const cartFlyLeft = cart.getBoundingClientRect().left;
            const cartFlyTop = cart.getBoundingClientRect().top;

            productImageFly.style.cssText = `
                left: ${cartFlyLeft}px;
                top: ${cartFlyTop}px;
                width: 0px;
                height: 0px;
                opacity: 0;
            `;

            productImageFly.addEventListener('transitionend', function () {
                if (productButon.classList.contains('_fly')) {
                    productImageFly.remove();
                    updateCart(productButon, productId);
                    productButon.classList.remove('_fly');
                }
            })
        }

    }

    function updateCart(productButton, productId, productAdd = true) {
        const cart = document.querySelector('.cart-header');
        const cartIcon = cart.querySelector('.cart-header__icon');
        const cartQuantity = cartIcon.querySelector('span');
        const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
        const cartList = document.querySelector('.cart-list');

        if (productAdd) {
            if (cartQuantity) {
                cartQuantity.innerHTML = ++cartQuantity.innerHTML;
            } else {
                cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
            }

            if (!cartProduct) {
                const product = document.querySelector(`[data-pid="${productId}"]`);
                const cartProductImage = product.querySelector('.item-product__image').innerHTML;
                const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
                const cartProductContent = `
                        <a href="" class="cart-list__image _ibg">${cartProductImage}</a>
                        <div class="cart-list__body">
                            <a href="" class="cart-list__title">${cartProductTitle}</a>
                            <div class="cart-list__quantity">Quantity: <span>1</span></div>
                            <a href="" class="cart-list__delete">Delete</a>
                        </div>`;
                cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
            } else {
                const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
                cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
            }

            productButton.classList.remove('_hold');
        } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
            if (!parseInt(cartProductQuantity.innerHTML)) {
                cartProduct.remove();
            }

            const cartQuantityValue = --cartQuantity.innerHTML;

            if (cartQuantityValue) {
                cartQuantity.innerHTML = cartQuantityValue;
            } else {
                cartQuantity.remove();
                cart.classList.remove("_active");
            }
        }
    }

}