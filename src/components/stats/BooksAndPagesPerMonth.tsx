import LineG2 from "./LineG2"
import StatisticsBooksAndPagesPerMonth from "./StatisticsBooksAndPagesPerMonth"
import ExpandableContainer from "../ui/ExpandableContainer"

const BooksAndPagesPerMonth = ({
    averagePagesPerDay,
    booksWithoutPages,
    countBooksFinished,
    countBooksFinishedMonthly,
    countBooksWithoutPages,
    countPagesFinished,
    countPagesFinishedMonthly,
    year,
}: {
    averagePagesPerDay: number
    booksWithoutPages: BooksWithoutPages
    countBooksFinished: number
    countBooksFinishedMonthly: number[]
    countBooksWithoutPages: number
    countPagesFinished: number
    countPagesFinishedMonthly: number[]
    year: number
}) => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()

    return (
        <>
            <article className="stats-item">
                <div className="h2 mb0">
                    Books & pages finished
                    <sub>
                        {countBooksFinished}. Books finished
                        <br />
                        {countPagesFinished}. Pages read
                        <br />
                        {averagePagesPerDay}. Average pages per day
                    </sub>
                </div>
                <LineG2
                    year={year}
                    data={countBooksFinishedMonthly}
                    data2={countPagesFinishedMonthly}
                    subjects={["Books", "Pages"]}
                />
                {countBooksWithoutPages > 0 && <span className="sf2">*</span>}
                <ExpandableContainer buttonText="Details">
                    <StatisticsBooksAndPagesPerMonth
                        countBooksFinishedMonthly={countBooksFinishedMonthly}
                        currentMonth={currentMonth}
                        countPagesFinishedMonthly={countPagesFinishedMonthly}
                        booksWithoutPages={booksWithoutPages}
                        year={year}
                    />
                </ExpandableContainer>
            </article>
        </>
    )
}
export default BooksAndPagesPerMonth
