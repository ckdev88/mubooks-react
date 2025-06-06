import { useContext } from "react"
import { supabase } from "../../utils/supabase"
import { AppContext } from "../App"

function useMyBooksUpdateDb({
    myBooksNew,
    book_id,
    msg,
}: {
    myBooksNew: Books
    book_id: Book["id"] | null
    msg: string
}): () => Promise<void> {
    const { setPopupNotification, userid } = useContext(AppContext)
    async function updateMyBooksDb(): Promise<void> {
        const { error } = await supabase
            .from("user_entries")
            .update({
                json: myBooksNew,
                testdata: `${msg} ${book_id !== null && "for book: " + book_id}`,
            })
            .eq("user_id", userid)
            .select("*")
        if (error) msg = error.message
        setPopupNotification(msg)
    }
    return updateMyBooksDb
}

export default useMyBooksUpdateDb
