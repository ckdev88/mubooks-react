import { getDurationDays } from "@/utils/Helpers"

const now: Date = new Date()
const curYear = now.getFullYear()
const curYearStartDayNr: Date = new Date(curYear, 0, 0)
const oneDay = 1000 * 60 * 60 * 24
const curYearDayNr: number = Math.floor((Number(now) - Number(curYearStartDayNr)) / oneDay)

const countBookValues = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
    /** Count Books Finished */
    let countBooksFinished = 0
    /** Count Books Finished Monthly */
    const countBooksFinishedMonthly: number[] = Array(12).fill(0)
    /** Count Books Without Pages */
    let countBooksWithoutPages = 0
    /** Count Pages Finished */
    let countPagesFinished = 0
    /** Count Pages Finished Monthly */
    const countPagesFinishedMonthly: number[] = Array(12).fill(0)
    /** Average Days Per Book - result of division by all past days of the year */
    let averageDaysPerBook = 0
    /**
     * Count days of reading
     * `Note:` days are assigned to finished year,
     * e.g. started in Dec, finished in Jan is assigned to the year of Jan.
     */
    const cdr = 0 // TODO: use or remove, now it's not used
    /** Average Days Per Book Specific - result of dividing sum days per book in the year */
    const adpbs = 0 // TODO: use or remove, now it's not used
    /** Days Per Book array where key is amount of days, value is amount of books */
    const daysPerBook: number[] = []
    /** Average Pages Per Day */
    let averagePagesPerDay = 0
    /** Counted Books with Stars */
    let countBooksWithStars = 0 // TODO is this used anywhere?
    /** Counted Books without Stars */
    let countBooksWithoutStars = 0
    /** Counted Stars Total */
    let countStarsTotal = 0 // TODO is this used anywhere?
    /**
     * Counted Stars Per Book
     * array of 5 values, [0]=1 star, [4]=5 stars, incremented by the amount of books per amount of stars/index
     */
    const countStarsPerBook: number[] = [0, 0, 0, 0, 0]
    /** Average Stars Per Book */
    let averageStarsPerBook = 0

    const booksWithoutPages: BooksWithoutPages = []
    const booksWithoutStars: BooksWithoutStars = []

    let monthIndex = 0

    if (myBooksArr !== undefined)
        myBooksArr.map((b) => {
            if (b.date_finished !== undefined && Math.floor(b.date_finished / 10000) === year) {
                countBooksFinished += 1

                monthIndex = Math.floor((b.date_finished - year * 10000) / 100) - 1
                // get monthly finished books
                countBooksFinishedMonthly[monthIndex] += 1

                // get pages
                if (
                    Number(b.number_of_pages_median) === 0 ||
                    b.number_of_pages_median === undefined
                ) {
                    // pages count
                    countBooksWithoutPages += 1
                    const pageless = { id: b.id, title_short: b.title_short }
                    booksWithoutPages.push(pageless)
                } else if (b.number_of_pages_median > 0) {
                    countPagesFinished += b.number_of_pages_median
                    // add up monthly finished pages
                    countPagesFinishedMonthly[monthIndex] += b.number_of_pages_median
                }

                // get star stats
                if (b.rate_stars > 0) {
                    countBooksWithStars += 1
                    countStarsTotal += b.rate_stars
                    countStarsPerBook[b.rate_stars - 1] += 1
                } else {
                    countBooksWithoutStars += 1
                    const starless = { id: b.id, title_short: b.title_short }
                    booksWithoutStars.push(starless)
                }

                if (b.date_reading !== undefined && b.date_finished !== undefined) {
                    const date_difference: number = getDurationDays(b.date_reading, b.date_finished)
                    if (daysPerBook[date_difference] === undefined) daysPerBook[date_difference] = 1
                    else daysPerBook[date_difference] += 1
                    // NOTE: see StatisticsDaysPerBookInYear for further handling, might be better to merge and optimize these two
                }
            }
        })

    if (year === curYear) {
        averageDaysPerBook = Math.floor(curYearDayNr / countBooksFinished) // NOTE: different from avgReadingPerFinished, TODO see if this one can be used anywhere, or remove
        averagePagesPerDay = Math.floor(countPagesFinished / curYearDayNr)
    } else {
        averageDaysPerBook = Math.floor(365 / countBooksFinished) // NOTE: different from avgReadingPerFinished, TODO see if this one can be used anywhere, or remove
        averagePagesPerDay = Math.floor(countPagesFinished / 365)
    }
    averageStarsPerBook = Number((countStarsTotal / countBooksWithStars).toFixed(1))

    // Average days per book specific: yearly amount of books / total amount of reading time

    return {
        countBooksFinished,
        countPagesFinished,
        countBooksFinishedMonthly,
        countPagesFinishedMonthly,
        countBooksWithoutPages,
        averageDaysPerBook,
        cdr,
        adpbs,
        averagePagesPerDay,
        averageStarsPerBook,
        countStarsPerBook,
        booksWithoutPages,
        booksWithoutStars,
        countBooksWithoutStars,
        daysPerBook
    }
}
export default countBookValues
