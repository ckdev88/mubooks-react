import { useContext, useEffect, useState } from "react"
import { debounce, openCalendarPopUp } from "../Helpers"
import { AppContext } from "../App"
import { convertDate } from "../helpers/convertDate"
import BtnTextGeneral from "./ui/buttons/BtnTextGeneral"
import useMyBooksUpdateDb from "../hooks/useMyBooksUpdateDb"

const BookStartedFinished = ({
    date_started,
    date_finished,
    book_id,
    list,
}: {
    date_started: Book["date_reading"]
    date_finished: Book["date_finished"]
    book_id: Book["id"]
    list: Book["list"]
}) => {
    const { userMyBooks, setUserMyBooks, setPopupNotification, userid, todaysDateInput } =
        useContext(AppContext)
    const [dateStarted, setDateStarted] = useState<Book["date_reading"]>(date_started)
    const [dateFinished, setDateFinished] = useState<Book["date_finished"]>(date_finished)
    const [showStartedDate, setShowStartedDate] = useState<boolean>(false)
    const [showFinishedDate, setShowFinishedDate] = useState<boolean>(false)

    const [newArray, setNewArray] = useState<Books>(userMyBooks)
    const msg = "Book starting / finished date changed"
    const updateMyBooksDb = useMyBooksUpdateDb({
        myBooksNew: newArray,
        book_id: null,
        msg,
    })

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
        dateFinished,
    ])

    function changeDates(fieldName: "date_reading" | "date_finished", fieldVal: number) {
        if (fieldName !== "date_reading" && fieldName !== "date_finished"){
            console.warn('changeDates: Wrong fieldName given')
            return
        }

        if (fieldName === "date_reading") setDateStarted(fieldVal)
        else { // fieldName === "date_finished"
            if (Number.isNaN(fieldVal)) {
                setDateFinished(undefined)
                list = 2
            } else setDateFinished(fieldVal)
        }

        let myBooks: Books
        if (userMyBooks === undefined) myBooks = []
        else myBooks = userMyBooks
        for (let i = 0; i < myBooks.length; i++) {
            if (myBooks[i].id === book_id) {
                if (fieldName === "date_reading") myBooks[i].date_reading = fieldVal
                if (fieldName === "date_finished") {
                    const tmpbooklist = myBooks[i].list
                    if (Number.isNaN(fieldVal)) myBooks[i].date_finished = undefined
                    if (
                        (myBooks[i].date_finished === null ||
                            myBooks[i].date_finished === undefined ||
                            myBooks[i].date_finished === 0) &&
                        tmpbooklist > 2
                    ) {
                        myBooks[i].list = 2
                        list = 2
                    } else myBooks[i].date_finished = fieldVal
                }
            }
        }
        setNewArray(myBooks)
        updateMyBooks(myBooks)
    }

    function updateMyBooks(arr: Books) {
        setUserMyBooks(arr)
        updateMyBooksDb()
    }

    function modifyDateReading(field: "date_reading" | "date_finished") {
        if (document.getElementById(field + book_id) === null) return
        const newDateArr = (
            document.getElementById(field + book_id) as HTMLInputElement
        ).value.split("-")
        const newDate = Number.parseInt(newDateArr[0] + newDateArr[1] + newDateArr[2], 10)
        changeDates(field, newDate)
    }
    useEffect(() => {
        if (dateStarted && showStartedDate) {
            const eleDateReading = document.getElementById(
                "date_reading" + book_id,
            ) as HTMLInputElement | null
            if (eleDateReading !== null) eleDateReading.value = convertDate(dateStarted, "input")
        }
        if (dateFinished && showFinishedDate) {
            const eleDateFinished = document.getElementById(
                "date_finished" + book_id,
            ) as HTMLInputElement | null
            if (eleDateFinished !== null) eleDateFinished.value = convertDate(dateFinished, "input")
        }
    }, [dateStarted, dateFinished, book_id, showStartedDate, showFinishedDate])

    return (
        <div className="book-started-finished">
            <div>
                {list === 2 && (
                    <>
                        <em className="btn-text">
                            <span className="icon icon-reading" />
                            <BtnTextGeneral
                                bClassName="btn-calendar"
                                bOnClick={() => openCalendarPopUp("date_reading" + book_id)}
                                bText={dateStarted && convertDate(dateStarted, "human")}
                            />
                        </em>
                        <input
                            tabIndex={-1}
                            id={"date_reading" + book_id}
                            name={"date_reading" + book_id}
                            type="date"
                            max={todaysDateInput}
                            className="calendar-hidden"
                            onChange={debounce(() => modifyDateReading("date_reading"), 100)}
                        />
                    </>
                )}

                {list > 2 && (
                    <>
                        <em className="btn-text">
                            <span className="icon icon-finished" />
                            <BtnTextGeneral
                                bClassName="btn-calendar"
                                bOnClick={() => openCalendarPopUp("date_finished" + book_id)}
                                bText={date_finished && convertDate(date_finished, "human")}
                            />
                        </em>
                        <input
                            tabIndex={-1}
                            id={"date_finished" + book_id}
                            name={"date_finished" + book_id}
                            type="date"
                            min={date_started && convertDate(date_started, "input")}
                            max={todaysDateInput}
                            className="calendar-hidden"
                            onChange={debounce(() => modifyDateReading("date_finished"), 100)}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
export default BookStartedFinished
