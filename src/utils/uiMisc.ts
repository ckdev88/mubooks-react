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
