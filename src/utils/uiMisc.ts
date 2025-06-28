export default async function collapseItem(book_id: Book["id"]) {
    /** Temporary Current Page, taken from url */
    const tcp = window.location.pathname.replace("/", "")
    if (tcp !== "search") {
        const ele = document.getElementById(`bookSummaryTransitioner${book_id}`)
        if (ele) {
            // Get the actual height first
            const height = ele.offsetHeight

            // Apply the starting max-height
            ele.style.maxHeight = `${height}px`

            // Force reflow to ensure styles are applied
            void ele.offsetHeight

            // Add the animation class
            ele.classList.add("collapse-item")

            // Remove element after animation completes
            ele.addEventListener("animationend", () => {
                ele.style = "display:none"
            })
        }
    }
}
