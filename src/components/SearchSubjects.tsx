import { useState } from "react"
import Badge from "@/components/ui/Badge"
import { cleanIndexKey } from "@/utils/cleanInput"
import BtnMoreToggle from "@/components/ui/buttons/BtnMoreToggle"

const subjectExpandLimit = 5

const SearchSubjects = ({ book_id, subjects }: { book_id: Book["id"]; subjects: BookSubjects }) => {
    const [showMore, setShowMore] = useState(false)

    function showMoreToggle() {
        setShowMore(!showMore)
    }

    if (subjects === undefined) return
    let toggleSubjects = false
    if (subjects.length > subjectExpandLimit) toggleSubjects = true

    return (
        <div className="subjects">
            {subjects.map((subject, index) => {
                const key = cleanIndexKey("subject" + book_id, index)
                if (showMore === true) {
                    return <Badge key={key} type="subject" text={subject} />
                }
                if (!showMore && index < subjectExpandLimit) {
                    return <Badge key={key} type="subject" text={subject} />
                }
            })}
            {toggleSubjects && (
                <BtnMoreToggle
                    bText={showMore ? "Show less" : "Show more..."}
                    bOnClick={() => showMoreToggle()}
                />
            )}
        </div>
    )
}
export default SearchSubjects
