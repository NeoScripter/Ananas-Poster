/* import './scss/style.scss';   */
import AnimationHandler from "./utils/animation";
import CarouselHandler from "./utils/carousel";

document.addEventListener('DOMContentLoaded', () => {
    const animationHandler = new AnimationHandler();
    animationHandler.init();

    const catalogCarousel: HTMLElement | null = document.querySelector('.aquila-catalog');
    if (catalogCarousel) {
        const caroselHandler = new CarouselHandler(catalogCarousel, '.aquila-catalog__viewport', '.aquila-catalog__btn--prev', '.aquila-catalog__btn--next');
        caroselHandler.init();
    }

    const promosCarousel: HTMLElement | null = document.querySelector('.aquila-promos');
    if (promosCarousel) {
        const caroselHandler = new CarouselHandler(promosCarousel, '.aquila-promos__viewport', '.aquila-promos__btn--prev', '.aquila-promos__btn--next');
        caroselHandler.init();
    }
})