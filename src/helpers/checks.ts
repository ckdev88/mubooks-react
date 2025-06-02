export function checkSimilar(value1 = "", value2 = ""): boolean {
    if (value1.trim().toLowerCase() === value2.trim().toLowerCase()) return true
    return false
}
