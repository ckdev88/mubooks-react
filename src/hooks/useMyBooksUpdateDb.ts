import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import useUpdateDb from "@/hooks/useUpdateDb"
import { notification as nm } from "@/i18n/notifications"

function useMyBooksUpdateDb({
    myBooksNew,
    book_id,
    msg
}: {
    myBooksNew: Books
    book_id: Book["id"] | null
    msg: string
}): () => Promise<void> {
    // TODO setUserMyBooks is er even uit voor ReviewRatingEdit.tsx , maar moet waarschijnlijk weer aan later
    // const { setPopupNotification, setUserMyBooks } = useContext(AppContext)
    const { setPopupNotification } = useContext(AppContext)
    const initUpdateDb = useUpdateDb({
        msg: msg,
        logMsg: `${msg} ${book_id !== null && nm.for_book_ + book_id}`,
        newJson: myBooksNew
    })

    const updateMyBooksDb = async (): Promise<void> => {
        // setPopupNotification("optimist")

        // setUserMyBooks(myBooksNew) // optimistic rendering // TODO dit is even uit voor ReviewRatingEdit.tsx , maar moet waarschijnlijk weer uit later
        const notification = await initUpdateDb()
        setPopupNotification(notification)
    }
    return updateMyBooksDb
}

export default useMyBooksUpdateDb
