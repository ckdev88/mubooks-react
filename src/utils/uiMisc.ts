export default function fadeout(book_id: Book["id"]): void {
    /** Temporary Current Page, taken from url */
    const tcp = window.location.pathname.replace("/", "")
    // TODO see if conditionals below are still applicable
    // if (
    //     (tcp === "reading" && targetList !== 2) ||
    //     (tcp === "wishlist" && targetList !== 1) ||
    //     (tcp === "favorites" && targetList !== 4) ||
    //     (tcp === "finished" && targetList !== 3 && targetList !== 4) ||
    //     (tcp === "tossed" && targetList > 0)
    // ) {
    if (tcp !== "search" && tcp !== "savedbooks") {
        document.getElementById(`bookSummaryTransitioner${book_id}`)?.classList.add("fadeout")
    }
}
