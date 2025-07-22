// TODO are these used anywhere?
import { HashLink } from "react-router-hash-link"
import { useContext } from "react"
import { AppContext } from "../../App"
import { getDurationDays } from "../../Helpers"
import { cleanAnchor } from "../../helpers/cleanInput"

interface ConciseDaysPerBook {
    id: Book["id"]
    title_short: Book["title_short"]
    days: Book["days"]
}
type ConciseDaysPerBookArray = ConciseDaysPerBook[]

interface OutputPerDaysAmount {
    days: number
    amount: number
    books: {
        id: string
        title_short: string
        days: number
    }[]
}
type OutputPerDaysAmountArray = OutputPerDaysAmount[]

function getBooksFinishedInYear(
    inputArray: Books,
    year: number,
    format: "concise" | "concise_daysperbook" | "full",
): Books | ConciseDaysPerBookArray {
    const arrayFull =
        inputArray !== undefined
            ? inputArray.filter(
                  (book) => book.date_finished && Math.floor(book.date_finished / 10000) === year,
              )
            : []

    if (format === "concise_daysperbook") {
        // OPTIMIZE might be quicker to just append 'days' into database
        const arrayConcise: ConciseDaysPerBookArray = []
        for (let i = 0; i < arrayFull.length; i++) {
            const bookToPush: ConciseDaysPerBook = {
                id: arrayFull[i].id,
                title_short: arrayFull[i].title_short,
                days: getDurationDays(arrayFull[i].date_reading, arrayFull[i].date_finished),
            }
            arrayConcise[i] = bookToPush
        }
        return arrayConcise
    }
    return arrayFull
}

function getDpbData(userMyBooks: Books, year: number) {
    const inputArray = getBooksFinishedInYear(userMyBooks, year, "concise_daysperbook")
    const outputArray: OutputPerDaysAmountArray = []

    const groupedItems: { [days: number]: OutputPerDaysAmount } = {}

    if (inputArray === undefined) return 0

    for (const bitem of inputArray) {
        const { id, title_short, days } = bitem
        if (days) {
            if (!groupedItems[days]) {
                groupedItems[days] = { days: days, amount: 0, books: [] }
            }

            groupedItems[days].amount++
            groupedItems[days].books.push({ id, title_short, days })
        }
    }

    for (const days in groupedItems) {
        outputArray.push(groupedItems[days])
    }
    return outputArray
}

const StatisticsDaysPerBookInYear = ({ year }: { year: number }) => {
    const { userMyBooks } = useContext(AppContext)
    if (userMyBooks === undefined) return 0
    const dpbd = getDpbData(userMyBooks, year)
    if (!dpbd) return <>Can't stat what is not there, right?</>

    return (
        <div>
            {dpbd.length > 0 &&
                dpbd.map((b, index) => {
                    const key = "sdpbiy_dpbd" + year + index
                    return (
                        <div key={key}>
                            {b.days} days:{" "}
                            <b>
                                {b.amount} {b.amount === 1 ? "book" : "books"}{" "}
                            </b>
                            <ul className="mt0">
                                {b.books.map((book, index) => {
                                    const refer: string =
                                        "/finished" + `#${cleanAnchor(book.title_short)}_${book.id}`
                                    const key = "sdpbiy_bokmap" + year + book.id + index
                                    return (
                                        <li key={key}>
                                            <HashLink to={refer} className="a-text">
                                                {book.title_short}
                                            </HashLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
        </div>
    )
}
export default StatisticsDaysPerBookInYear
