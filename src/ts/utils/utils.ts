export function addGlobalEventListener(
    type: keyof DocumentEventMap,
    selector: string,
    callback: (e: Event) => void,
    options?: boolean | AddEventListenerOptions,
    parent: Document | HTMLElement = document
): void {
    parent.addEventListener(
        type,
        (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.matches(selector)) {
                callback(e);
            }
        },
        options
    );
}

export function qs<T extends HTMLElement>(selector: string, parent: Document | HTMLElement = document): T | null {
    return parent.querySelector<T>(selector);
}

export function qsa<T extends HTMLElement>(selector: string, parent: Document | HTMLElement = document): T[] {
    return Array.from(parent.querySelectorAll<T>(selector));
}

interface ElementOptions {
    class?: string;
    dataset?: { [key: string]: string };
    text?: string;
    [key: string]: any;
}

export function createElement(type: keyof HTMLElementTagNameMap, options: ElementOptions = {}): HTMLElement {
    const element = document.createElement(type);

    for (const [key, value] of Object.entries(options)) {
        switch (key) {
            case "class":
                if (typeof value === "string") element.classList.add(value);
                break;
            case "dataset":
                Object.assign(element.dataset, value);
                break;
            case "text":
                if (typeof value === "string") element.textContent = value;
                break;
            default:
                if (typeof value === "string") element.setAttribute(key, value);
                break;
        }
    }

    return element;
}

export function sleep(duration: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
