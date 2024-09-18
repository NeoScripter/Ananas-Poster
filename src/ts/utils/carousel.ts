export default class CarouselHandler {
    private slides: HTMLElement[] = [];
    private currentSlide: number = 0;
    private viewport: HTMLElement | null;
    private prevButton: HTMLElement | null;
    private nextButton: HTMLElement | null;
    private numberOfSlides: number;
    private gapWidth: number;
    private offsetToEnd: number;

    // Touch event properties
    private touchStartX: number = 0;
    private touchEndX: number = 0;
    private minSwipeDistance: number = 50; 

    constructor(item: HTMLElement, viewportSelector: string, prevBtnSelector: string, nextBtnSelector: string) {
        this.viewport = item.querySelector(viewportSelector);
        this.prevButton = item.querySelector(prevBtnSelector);
        this.nextButton = item.querySelector(nextBtnSelector);
        this.numberOfSlides = 0;
        this.gapWidth = 0;
        this.offsetToEnd = 0;
    }

    public init(): void {
        this.initialSetup();
        this.handleWindowResize();
        this.attachPrevButtonEvent();
        this.attachNextButtonEvent();
        this.attachTouchEvents();
    }

    private handleWindowResize() {
        window.addEventListener('resize', () => {
            this.initialSetup();
        })
    }

    private initialSetup() {
        this.extractComputedStyles();
        this.setupSlides();
        this.adjustOffsetToEnd();
    }

    private adjustOffsetToEnd() {
        const adjustment = Math.max(2, this.numberOfSlides); 
        this.offsetToEnd = this.slides.length - adjustment;
    }

    private extractComputedStyles() {
        if (!this.viewport) {
            console.warn("can't find the viewport");
            return;
        }
        const styles = getComputedStyle(this.viewport);
        this.numberOfSlides = Number(styles.getPropertyValue('--_slides').trim());
        const gapWidthRem = styles.getPropertyValue('--_gap').trim();
        this.gapWidth = Number(gapWidthRem.slice(0, -3)) * 16;
    }

    private setupSlides(): void {
        if (!this.viewport) {
            console.warn('Viewport element not found.');
            return;
        }

        this.slides = Array.from(this.viewport.children) as HTMLElement[];
    }

    private updateSlidePosition(): void {
        if (!this.viewport || this.slides.length === 0) return;

        const viewportWidth = this.viewport.offsetWidth;
        const offset = ((viewportWidth / this.numberOfSlides) + (this.gapWidth / this.numberOfSlides)) * this.currentSlide;
        this.viewport.style.transform = `translateX(${-offset}px)`;
    }

    private attachPrevButtonEvent(): void {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.goToPreviousSlide();
            });
        }
    }

    private attachNextButtonEvent(): void {
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.goToNextSlide();
            });
        }
    }

    // Methods to navigate slides
    private goToPreviousSlide(): void {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlidePosition();
        } else {
            this.currentSlide = this.offsetToEnd;
            this.updateSlidePosition();
        }
    }

    private goToNextSlide(): void {
        if (this.currentSlide < this.offsetToEnd) {
            this.currentSlide++;
            this.updateSlidePosition();
        } else {
            this.currentSlide = 0;
            this.updateSlidePosition();
        }
    }

    // Touch event handlers
    private attachTouchEvents(): void {
        if (!this.viewport) return;

        const viewportWidthInSlides = this.numberOfSlides;
        const currentNumberOfSlides: number = this.slides.length;
        if (viewportWidthInSlides >= currentNumberOfSlides) {
            return;
        }

        this.viewport.addEventListener('touchstart', (e: TouchEvent) => this.handleTouchStart(e), false);
        this.viewport.addEventListener('touchmove', (e: TouchEvent) => this.handleTouchMove(e), false);
        this.viewport.addEventListener('touchend', () => this.handleTouchEnd(), false);
    }

    private handleTouchStart(e: TouchEvent): void {
        this.touchStartX = e.touches[0].clientX;
    }

    private handleTouchMove(e: TouchEvent): void {
        this.touchEndX = e.touches[0].clientX;
    }

    private handleTouchEnd(): void {
        const deltaX = this.touchEndX - this.touchStartX;
        if (Math.abs(deltaX) > this.minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right
                this.goToPreviousSlide();
            } else {
                // Swipe left
                this.goToNextSlide();
            }
        }
    }
}
