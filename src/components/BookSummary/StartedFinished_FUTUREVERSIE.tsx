/*
import { useContext, useEffect, useState } from "react"
import { debounce, openCalendarPopUp } from "@/utils/Helpers"
import { AppContext } from "@/context/AppContext"
import { convertDate } from "@/utils/convertDate"
import BtnTextGeneral from "@/components/ui/buttons/BtnTextGeneral"
import useMyBooksUpdateDb from "@/hooks/useMyBooksUpdateDb"
import StartedFinishedView from "@/components/BookSummary/StartedFinishedView"
import StartedFinishedEdit from "@/components/BookSummary/StartedFinishedEdit"

const BookSummaryStartedFinished = ({
    date_started,
    date_finished,
    book_id,
    list,
    readOnly,
    editMode
}: {
    date_started: Book["date_reading"]
    date_finished: Book["date_finished"]
    book_id: Book["id"]
    list: Book["list"]
    readOnly?: boolean
    editMode?: boolean
}) => {
    const { userMyBooks, setUserMyBooks, todaysDateInput } = useContext(AppContext)
    const [dateStarted, setDateStarted] = useState<Book["date_reading"]>(date_started)
    const [dateFinished, setDateFinished] = useState<Book["date_finished"]>(date_finished)
    function setDateFinishedInit(datum: Book["date_finished"]) {
        setDateFinished(datum)
    }
    const [showStartedDate, setShowStartedDate] = useState<boolean>(false)
    const [showFinishedDate, setShowFinishedDate] = useState<boolean>(false)

    const [newArray, setNewArray] = useState<Books>(userMyBooks)
    const msg = "Book starting / finished date changed"
    const updateMyBooksDb = useMyBooksUpdateDb({
        myBooksNew: newArray,
        book_id: null,
        msg
    })

    function setNewArrayInit(arr: Books) {
        setNewArray(arr)
    }
    function setDateStartedInit(date: undefined | number) {
        setDateStarted(date)
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (date_finished === 0) {
            setShowStartedDate(true)
            setShowFinishedDate(false)
        } else {
            setShowStartedDate(false)
            setShowFinishedDate(true)
        }
    }, [
        date_finished,
        userMyBooks,
        date_started,
        setShowStartedDate,
        setShowFinishedDate,
        dateFinished
    ])

    if (readOnly || editMode === false) {
        return (
            <StartedFinishedView
                list={list}
                dateStarted={dateStarted}
                dateFinished={dateFinished}
            />
        )
    }
    return (
        <StartedFinishedEdit
            book_id={book_id}
            list={list}
            setNewArrayInit={setNewArrayInit}
            setDateStartedInit={setDateStartedInit}
            setDateFinishedInit={setDateFinishedInit}
        />
    )
}
export default BookSummaryStartedFinished
*/
