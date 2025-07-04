import { useState, useRef, useEffect } from "react"
import LineG2 from "./LineG2"
import BtnTextGeneral from "../ui/buttons/BtnTextGeneral"
import getMonthName from "../../utils/monthName"
import StatisticsFinishedInMonth from "./StatisticsFinishedInMonth"
import BooksWithoutPagesList from "./BooksWithoutPagesList"
import { animateHeight, cleanupAnimation } from "../../utils/uiMisc"

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

    const [showDetails, setShowDetails] = useState<boolean>(false)
    const detailsRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!detailsRef.current) return

        animateHeight(detailsRef.current, showDetails)

        return () => {
            if (detailsRef.current) {
                cleanupAnimation(detailsRef.current)
            }
        }
    }, [showDetails])

    // <div className={showDetails ? "mt05 sf" : "mt05 sf dnone"}>
    return (
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
            <BtnTextGeneral
                bOnClick={() => setShowDetails(!showDetails)}
                bText={showDetails ? "Less details" : "More details..."}
                bAlign="right"
            />
            <div
                ref={detailsRef}
                style={{
                    overflow: "hidden",
                    height: 0,
                }}
            >
                {showDetails && (
                    <div className="mt05 sf">
                        {countBooksFinishedMonthly.slice(0, currentMonth + 1).map((c, index) => {
                            const yearmonth: number = year * 100 + (index + 1) // year 2022 index 2 > 202203
                            const key = "countBooksFinishedMonthly" + year + index

                            return (
                                <div key={key}>
                                    {getMonthName(index)}:{" "}
                                    <b>
                                        {c} {c === 1 ? "book" : "books"},{" "}
                                        {countPagesFinishedMonthly[index]} pages
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
                        {booksWithoutPages.length > 0 && (
                            <BooksWithoutPagesList
                                booksWithoutPages={booksWithoutPages}
                                year={year}
                                key={year}
                            />
                        )}
                    </div>
                )}
            </div>
        </article>
    )
}
export default BooksAndPagesPerMonth
