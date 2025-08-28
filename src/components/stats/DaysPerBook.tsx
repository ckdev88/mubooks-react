import LineG3 from "@/components/stats/LineG3"
import StatisticsDaysPerBookInYear from "@/components/stats/StatisticsDaysPerBookInYear"
import ExpandableContainer from "@/components/ui/ExpandableContainer"

const DaysPerBook = ({
    daysPerBook,
    year,
    avgReadingPerFinished,
}: { daysPerBook: number[]; year: number; avgReadingPerFinished: number }) => {
    return (
        <>
            <article className="stats-item">
                <div className="h2 mb0">
                    Days per book
                    <sub>{avgReadingPerFinished}. Days average to start and finish.</sub>
                </div>
                <LineG3 data={daysPerBook} />
                <ExpandableContainer buttonText="Details">
                    <StatisticsDaysPerBookInYear year={year} />
                </ExpandableContainer>
            </article>
        </>
    )
}
export default DaysPerBook
