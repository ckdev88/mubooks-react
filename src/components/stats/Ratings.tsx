import { useState, useRef, useEffect } from "react"
import PieG from "./PieG"
import BtnTextGeneral from "../ui/buttons/BtnTextGeneral"
import StatisticsStarsPerBookInYear from "./StatisticsStarsPerBookInYear"
import BooksWithoutStarsList from "./BooksWithoutStarsList"
import { animateHeight, cleanupAnimation } from "../../utils/uiMisc"

const Ratings = ({
    countStarsPerBook,
    averageStarsPerBook,
    countBooksWithoutStars,
    year,
    booksWithoutStars,
}: {
    countStarsPerBook: number[]
    averageStarsPerBook: number
    countBooksWithoutStars: number
    year: number
    booksWithoutStars: BooksWithoutStars
}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const detailsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!detailsRef.current) return

        // <div className={showDetails ? "mt05 sf" : "mt05 sf dnone"}>
        animateHeight(detailsRef.current, showDetails)

        return () => {
            if (detailsRef.current) {
                cleanupAnimation(detailsRef.current)
            }
        }
    }, [showDetails])

    return (
        <article className="stats-item">
            <div className="h2 mb0">
                How I rated my books in {year}
                <sub>
                    {averageStarsPerBook}. Stars on average
                    <span className="sf2">*</span>
                </sub>
            </div>
            <PieG data={countStarsPerBook} />
            {countBooksWithoutStars > 0 && (
                <>
                    <br />
                    <BtnTextGeneral
                        bOnClick={() => setShowDetails(!showDetails)}
                        bText={!showDetails ? "More details..." : "Less details"}
                        bAlign="right"
                    />
                    <div
                        ref={detailsRef}
                        style={{
                            overflow: "hidden",
                            height: 0,
                        }}
                    >
                        {countStarsPerBook.length > 0 && (
                            <StatisticsStarsPerBookInYear year={year} />
                        )}

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
                    </div>
                </>
            )}
        </article>
    )
}

export default Ratings
