import { useContext } from "react"
import { AppContext } from "../App"
import useUpdateDb from "./useUpdateDb"

function useMyBooksUpdateDb({
    myBooksNew,
    book_id,
    msg,
}: {
    myBooksNew: Books
    book_id: Book["id"] | null
    msg: string
}): () => Promise<void> {
    const { setPopupNotification, setUserMyBooks } = useContext(AppContext)
    const initUpdateDb = useUpdateDb({
        msg: msg,
        logMsg: `${msg} ${book_id !== null && "for book: " + book_id}`,
        newJson: myBooksNew,
    })

    const updateMyBooksDb = async (): Promise<void> => {
        // setPopupNotification("optimist")
        setUserMyBooks(myBooksNew)
        const notification = await initUpdateDb()
        setPopupNotification(notification)
    }
    return updateMyBooksDb
}

export default useMyBooksUpdateDb
