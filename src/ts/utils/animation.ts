export default class AnimationHandler {
    accordionBtn: HTMLElement | null;
    accordionElement: HTMLElement | null;
    accordionClosedClass: string;

    constructor() {
        this.accordionElement = document.querySelector('.aquila-accordion__slider');
        this.accordionClosedClass = 'aquila-accordion__slider--closed';
        this.accordionBtn = document.querySelector('.aquila-accordion__btn');
    }

    init() {
        this.toggleAccordion();
    }

    toggleAccordion() {
        if (!this.accordionElement || !this.accordionBtn) {
            console.warn("Accordion or button are not in the DOM!");
            return;
        }
        this.accordionBtn.addEventListener('click', () => {
            this.accordionElement?.classList.toggle(this.accordionClosedClass);
        })
    }
}