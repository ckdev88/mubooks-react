export default function fadeout(book_id: Book["id"]): void {
    // TODO see if conditionals below are still applicable
    /** Temporary Current Page, taken from url */
    // const tcp = window.location.pathname.replace("/", "")
    // if (
    //     (tcp === "reading" && targetList !== 2) ||
    //     (tcp === "wishlist" && targetList !== 1) ||
    //     (tcp === "favorites" && targetList !== 4) ||
    //     (tcp === "finished" && targetList !== 3 && targetList !== 4) ||
    //     (tcp === "tossed" && targetList > 0)
    // ) {
    document.getElementById(`bookSummaryTransitioner${book_id}`)?.classList.add("fadeout")
}
