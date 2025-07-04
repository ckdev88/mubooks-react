import { useState, useRef, useEffect } from "react"
import LineG3 from "./LineG3"
import BtnTextGeneral from "../ui/buttons/BtnTextGeneral"
import StatisticsDaysPerBookInYear from "./StatisticsDaysPerBookInYear"
import { animateHeight, cleanupAnimation } from "../../utils/uiMisc"

const DaysPerBook = ({
    daysPerBook,
    year,
    avgReadingPerFinished,
}: { daysPerBook: number[]; year: number; avgReadingPerFinished: number }) => {
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

    return (
        <>
            <article className="stats-item">
                <div className="h2 mb0">
                    Days per book
                    <sub>{avgReadingPerFinished}. Days average to start and finish.</sub>
                </div>
                <LineG3 data={daysPerBook} />
                <BtnTextGeneral
                    bClassName="fs-inherit"
                    bOnClick={() => setShowDetails(!showDetails)}
                    bText={!showDetails ? "More details..." : "Less details"}
                    bAlign="right"
                />
                {
                    //    <div className="mt05 sf">
                }
                <div
                    ref={detailsRef}
                    style={{
                        overflow: "hidden",
                        height: 0,
                    }}
                >
                    {showDetails && <StatisticsDaysPerBookInYear year={year} />}
                </div>
                <br />
            </article>
        </>
    )
}
export default DaysPerBook
