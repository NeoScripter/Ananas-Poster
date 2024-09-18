/* import './scss/style.scss';   */
import AnimationHandler from "./utils/animation";
import CarouselHandler from "./utils/carousel";

document.addEventListener('DOMContentLoaded', () => {
    const animationHandler = new AnimationHandler();
    animationHandler.init();

    const carouselGroups: NodeListOf<HTMLElement> = document.querySelectorAll('.aquila-catalog');
    carouselGroups?.forEach((carouselItem) => {
        const caroselHandler = new CarouselHandler(carouselItem);
        caroselHandler.init();
    })
})