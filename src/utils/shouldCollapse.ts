// OPTIMIZE: this can be a bit more dynamic, no?
import { getCurrentPage } from "../Helpers"

/** Check if the element should be allowed to collapse, based on the event and the current page. */
export default function shouldCollapse(
    targetList?: number,
    removeType?: "move" | "toss" | "untoss" | "permatoss" | "permatoss_tossers",
): boolean {
    const currentPage = getCurrentPage()

    if (
        (currentPage === "wishlist" && targetList !== 1) ||
        (currentPage === "reading" && targetList !== 2) ||
        (currentPage === "tossed" && removeType === "untoss") ||
        (currentPage === "tossed" && removeType === "permatoss")
    ) {
        console.log("\nCOLLAPSING")
        return true
    }

    if (
        (currentPage === "savedbooks" && removeType !== "toss") ||
        currentPage === "search" ||
        (targetList === 4 &&
            (currentPage === "savedbooks" ||
                currentPage === "finished" ||
                currentPage === "tropes" ||
                currentPage === "tossed")) ||
        (currentPage === "tropes" && removeType !== "toss")
    ) {
        console.log("\nLETS NOT GO COLLAPSING")
        return false
    }

    console.log("\nSHOULD COLLAPSE")
    return true
}
