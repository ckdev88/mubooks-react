import StatisticsFinishedInMonth from "./StatisticsFinishedInMonth"
import BooksWithoutPagesList from "./BooksWithoutPagesList"
import getMonthName from "../../utils/monthName"

function StatisticsBooksAndPagesPerMonth({
    countBooksFinishedMonthly,
    currentMonth,
    year,
    countPagesFinishedMonthly,
    booksWithoutPages,
}: {
    countBooksFinishedMonthly: number[]
    currentMonth: number
    year: number
    countPagesFinishedMonthly: number[]
    booksWithoutPages: BooksWithoutPages
}) {
    return (
        <>
            {countBooksFinishedMonthly.slice(0, currentMonth + 1).map((c, index) => {
                const yearmonth: number = year * 100 + (index + 1) // year 2022 index 2 > 202203
                const key = "countBooksFinishedMonthly" + year + index

                return (
                    <div key={key}>
                        {getMonthName(index)}:{" "}
                        <b>
                            {c} {c === 1 ? "book" : "books"}, {countPagesFinishedMonthly[index]}{" "}
                            pages
                        </b>
                        &nbsp;
                        <br />
                        <ul className="mt0 mb0">
                            <StatisticsFinishedInMonth yearmonth={yearmonth} />
                        </ul>
                        {c > 0 && <br />}
                    </div>
                )
            })}
            <br />
            <BooksWithoutPagesList booksWithoutPages={booksWithoutPages} year={year} key={year} />
        </>
    )
}
export default StatisticsBooksAndPagesPerMonth
