import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"
import getFinishedBooksStatsYears from "../../functions/getFinishedBooksStatsYears"
import StatisticsYear from "../../components/stats/StatisticsYear"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const StatisticsPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)

    const [years, setYears] = useState<number[] | undefined>(undefined)

    useEffect(() => {
        userMyBooks !== undefined && setYears(getFinishedBooksStatsYears(userMyBooks).yearArr)
    }, [userMyBooks])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: GLOBALS.pageAnimationDuration,
                delay: GLOBALS.pageAnimationDelay,
            }}
            animate={{ opacity: 1 }}
        >
            <Heading
                text="Statistics"
                sub="See more about your book reading journey"
                icon="icon-statistics.svg"
            />
            {years !== undefined ? (
                <>
                    {years.length > 0 ? (
                        <div>
                            {years.map((y) => {
                                const filteredByYear = userMyBooks?.filter(
                                    (b) =>
                                        b.date_finished !== undefined &&
                                        Math.floor(b.date_finished / 10000) === y,
                                )
                                return (
                                    <StatisticsYear
                                        myBooksArr={filteredByYear}
                                        year={y}
                                        key={`statisticsPageYear${y}`}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <p>
                            No stats yet, stats are generated when you finish reading a book and
                            when you rate the book you read.
                        </p>
                    )}
                </>
            ) : (
                <span className="loader-dots" />
            )}
        </motion.div>
    )
}

export default StatisticsPage
