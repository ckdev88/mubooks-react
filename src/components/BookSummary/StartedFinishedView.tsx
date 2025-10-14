import convertDate from "@/utils/convertDate"
import BtnTextGeneral from "@/components/ui/buttons/BtnTextGeneral"

interface Props {
    list: number
    dateStarted: number | undefined
    dateFinished: number | undefined
}

export default function StartedFinishedView({ list, dateStarted, dateFinished }: Props) {
    return (
        <div className="book-started-finished">
            <div>
                {list === 2 && (
                    // reading since <date>
                    <em className="btn-text readonly">
                        <span className="icon icon-reading" />
                        <BtnTextGeneral
                            bText={dateStarted && convertDate(dateStarted, "human")}
                            readOnly={true}
                        />
                    </em>
                )}
                {
                    // finished at <date>
                    list > 2 && (
                        <em className="btn-text readonly">
                            <span className="icon icon-finished" />
                            <BtnTextGeneral
                                bText={dateFinished && convertDate(dateFinished, "human")}
                                readOnly={true}
                            />
                        </em>
                    )
                }
            </div>
        </div>
    )
}
