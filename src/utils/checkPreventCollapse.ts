// OPTIMIZE: this can be a bit more dynamic, no?
export default function checkPreventCollapse(
    targetList: number,
    currentPage: string,
    removeType?: "move" | "toss" | "untoss" | "permatoss" | "permatoss_tossers",
): boolean {
    if (
        (targetList === 4 &&
            (currentPage === "savedbooks" ||
                currentPage === "finished" ||
                currentPage === "tropes" ||
                currentPage === "tossed")) ||
        (currentPage === "savedbooks" && !removeType && removeType !== "toss") ||
        (currentPage === "tropes" && (!removeType || removeType !== "toss"))
    ) {
        return true
    }
    return false
}
