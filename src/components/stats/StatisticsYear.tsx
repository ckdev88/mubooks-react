import countBookValues from "../../functions/countBookValues"
import Heading from "../ui/Heading"
import { getTotalBooksFinished, getTotalReadingDays } from "../../utils/stats/statsTotals"
import DaysPerBook from "./DaysPerBook"
import Ratings from "./Ratings"
import BooksAndPagesPerMonth from "./BooksAndPagesPerMonth"

function StatisticsYear({ myBooksArr, year }: { myBooksArr: Books; year: number }) {
    const bookMetrics = countBookValues({ myBooksArr, year })
    const {
        averagePagesPerDay,
        averageStarsPerBook,
        booksWithoutPages,
        booksWithoutStars,
        countBooksFinished,
        countBooksFinishedMonthly,
        countBooksWithoutPages,
        countBooksWithoutStars,
        countPagesFinished,
        countPagesFinishedMonthly,
        countStarsPerBook,
        daysPerBook,
    } = bookMetrics

    const readingStats = (() => {
        const totalDays = getTotalReadingDays(daysPerBook)
        const totalBooks = getTotalBooksFinished(daysPerBook)
        return {
            totalDays,
            totalBooks,
            avgDaysPerBook: Math.round(totalDays / totalBooks),
            hasRatings: countStarsPerBook.reduce((sum, rating) => sum + rating, 0) > 0,
        }
    })()

    return (
        <section className="stats-year">
            <Heading text={year.toString()} icon="icon-statistics.svg" />

            <BooksAndPagesPerMonth
                averagePagesPerDay={averagePagesPerDay}
                booksWithoutPages={booksWithoutPages}
                countBooksFinished={countBooksFinished}
                countBooksFinishedMonthly={countBooksFinishedMonthly}
                countBooksWithoutPages={countBooksWithoutPages}
                countPagesFinished={countPagesFinished}
                countPagesFinishedMonthly={countPagesFinishedMonthly}
                year={year}
            />
            <DaysPerBook
                daysPerBook={daysPerBook}
                year={year}
                avgReadingPerFinished={readingStats.avgDaysPerBook}
            />
            {readingStats.hasRatings && (
                <Ratings
                    countStarsPerBook={countStarsPerBook}
                    averageStarsPerBook={averageStarsPerBook}
                    countBooksWithoutStars={countBooksWithoutStars}
                    year={year}
                    booksWithoutStars={booksWithoutStars}
                />
            )}
        </section>
    )
}

export default StatisticsYear
