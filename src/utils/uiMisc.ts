export default async function collapseItem(book_id: Book["id"]) {
    /** Temporary Current Page, taken from url */
    const tcp = window.location.pathname.replace("/", "")
    if (tcp !== "search") {
        const ele = document.getElementById(`bookSummaryTransitioner${book_id}`)
        if (ele) {
            ele.style.maxHeight = `${ele.offsetHeight}px` // Apply the starting max-height
            void ele.offsetHeight // Force reflow to ensure styles are applied
            ele.classList.add("collapse-item")
        }
    }
}

export const animateHeight = (element: HTMLElement, isOpen: boolean, duration = 250) => {
    if (isOpen) {
        // Open animation
        element.style.height = "auto"
        const fullHeight = element.scrollHeight
        element.style.height = "0px"

        requestAnimationFrame(() => {
            element.style.transition = `height ${duration}ms ease`
            element.style.height = `${fullHeight}px`
        })
    } else {
        // Close animation
        element.style.transition = `height ${duration}ms ease`
        element.style.height = "0px"
    }
}

export const cleanupAnimation = (element: HTMLElement) => {
    // Remove inline styles when component unmounts
    element.style.height = ""
    element.style.transition = ""
}
