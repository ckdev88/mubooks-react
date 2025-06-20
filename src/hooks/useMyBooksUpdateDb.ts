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
    const { setPopupNotification } = useContext(AppContext)
    const updateDb = useUpdateDb({
        msg: msg,
        logMsg: `${msg} ${book_id !== null && "for book: " + book_id}`,
        newJson: myBooksNew,
    })

    const updateMyBooksDb = async (): Promise<void> => {
        setPopupNotification("optimist")
        setPopupNotification(updateDb)
    }
    return updateMyBooksDb
}

export default useMyBooksUpdateDb
