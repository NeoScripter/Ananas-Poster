export default class AnimationHandler {
    accordionBtn: HTMLElement | null;
    accordionElement: HTMLElement | null;
    accordionClosedClass: string;

    catalogSections: NodeListOf<HTMLElement> | null;
    selectedCatalogSectionClass: string;
    catalogLikeBtns: NodeListOf<HTMLElement> | null;
    activeCatalogLikeBtnClass: string;

    constructor() {
        this.accordionElement = document.querySelector('.aquila-accordion__slider');
        this.accordionClosedClass = 'aquila-accordion__slider--closed';
        this.accordionBtn = document.querySelector('.aquila-accordion__btn');

        this.catalogSections = document.querySelectorAll('.aquila-catalog__option');
        this.selectedCatalogSectionClass = 'aquila-catalog__option--selected';
        this.catalogLikeBtns = document.querySelectorAll('.aquila-catalog__like');
        this.activeCatalogLikeBtnClass = 'aquila-catalog__like--clicked';
    }

    init() {
        this.toggleAccordion();
        this.toggleLikeBtns();
        this.changeCatalogCategory();
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

    changeCatalogCategory() {
        if (!this.catalogSections) {
            console.warn("Categories are not found in the DOM!");
            return;
        }
        const self = this;
        this.catalogSections.forEach(section => {
            section.addEventListener('click', function() {
                this.classList.add(self.selectedCatalogSectionClass);
                self.unselectCategories(section);
            })
        })
    }

    unselectCategories(currentCategory: HTMLElement) {
        this.catalogSections?.forEach(category => {
            if (currentCategory !== category) {
                category.classList.remove(this.selectedCatalogSectionClass);
            }
        })
    }

    toggleLikeBtns() {
        if (!this.catalogLikeBtns) {
            console.warn("No like buttons found in the DOM!");
            return;
        }
        const self = this;
        this.catalogLikeBtns.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                this.classList.toggle(self.activeCatalogLikeBtnClass);
            })
        })
    }
}