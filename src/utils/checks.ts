/** Returns true if value of prop 1 is similar to prop 2 */
export function checkSimilar(value1 = "", value2 = ""): boolean {
    if (value1.trim().toLowerCase() === value2.trim().toLowerCase()) return true
    return false
}
