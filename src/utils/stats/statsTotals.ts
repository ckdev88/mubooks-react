/**
 * Use key (containing amount of books) * days per book
 * @returns {number} total amount of reading days
 */
export const getTotalReadingDays = (daysPerBook: number[]): number => {
    let total = 0
    for (const key in daysPerBook) {
        if (Number(key) > 0) total += Number(key) * daysPerBook[key]
    }
    return total
}

/** Use key (containing amount of books) summed up
 * @returns total amount of finished books
 */
export function getTotalBooksFinished(daysPerBook: number[]): number {
    let total = 0
    for (const key in daysPerBook) {
        if (Number(key) > 0) total += Number(daysPerBook[key])
    }
    return total
}
