import { memo, useMemo } from "react"
import PieG from "@/components/stats/PieG"
import StatisticsStarsPerBookInYear from "@/components/stats/StatisticsStarsPerBookInYear"
import BooksWithoutStarsList from "@/components/stats/BooksWithoutStarsList"
import ExpandableContainer from "@/components/ui/ExpandableContainer"

interface RatingsProps {
    countStarsPerBook: number[]
    averageStarsPerBook: number
    countBooksWithoutStars: number
    year: number
    booksWithoutStars: BooksWithoutStars
}

const Ratings = memo(
    ({ countStarsPerBook, averageStarsPerBook, year, booksWithoutStars }: RatingsProps) => {
        const expandableContent = useMemo(
            () => (
                <>
                    {countStarsPerBook.length > 0 && <StatisticsStarsPerBookInYear year={year} />}
                    {booksWithoutStars.length > 0 && (
                        <div>
                            <br />
                            <i>* Books without stars defined: </i>
                            <ul className="mt0">
                                <BooksWithoutStarsList
                                    booksWithoutStars={booksWithoutStars}
                                    year={year}
                                    key={year}
                                />
                            </ul>
                        </div>
                    )}
                </>
            ),
            [countStarsPerBook.length, booksWithoutStars, year],
        )

        const averageStarsText = useMemo(
            () => (
                <sub>
                    {averageStarsPerBook}. Stars on average
                    <span className="sf2">*</span>
                </sub>
            ),
            [averageStarsPerBook],
        )

        return (
            <article className="stats-item">
                <div className="h2 mb0">
                    How I rated my books in {year}
                    {averageStarsText}
                </div>
                <PieG data={countStarsPerBook} />
                <ExpandableContainer>{expandableContent}</ExpandableContainer>
            </article>
        )
    },
)

// Custom comparison function for memo
function areEqual(prevProps: RatingsProps, nextProps: RatingsProps) {
    return (
        prevProps.year === nextProps.year &&
        prevProps.averageStarsPerBook === nextProps.averageStarsPerBook &&
        prevProps.countBooksWithoutStars === nextProps.countBooksWithoutStars &&
        prevProps.countStarsPerBook.length === nextProps.countStarsPerBook.length &&
        prevProps.booksWithoutStars.length === nextProps.booksWithoutStars.length &&
        // Deep comparison of booksWithoutStars array if needed
        prevProps.booksWithoutStars.every(
            (book, index) =>
                book.id === nextProps.booksWithoutStars[index]?.id &&
                book.title_short === nextProps.booksWithoutStars[index]?.title_short,
        )
    )
}

export default memo(Ratings, areEqual)
