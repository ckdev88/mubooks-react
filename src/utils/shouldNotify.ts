// OPTIMIZE animation - the set of page:targetList could be a bit more dynamic, no?
import { getCurrentPage } from "@/Helpers"

/** Check if the element should be allowed to notify, based on the event and the current page. */
export default function shouldNotify(targetList?: number): boolean {
    const currentPage = getCurrentPage()

    if (
        (currentPage === "finished" && targetList === 4) ||
        (currentPage === "search" && targetList === 4) ||
        (currentPage === "savedbooks" && targetList === 4) ||
        (currentPage === "tropes" && targetList === 4)
    )
        return false

    return true
}
