import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import useMyBooksUpdateDb from "@/hooks/useMyBooksUpdateDb"
import BtnBig from "@/components/ui/buttons/BtnBig"
import { notification as nm } from "@/i18n/notifications"

const newArr: [] = []
function ClearMyBooks() {
    const { setUserMyBooks } = useContext(AppContext)
    setUserMyBooks(newArr)
    const clearbooks = useMyBooksUpdateDb({
        myBooksNew: newArr,
        book_id: null,
        msg: nm.Books_cleared,
    })
    function clearbooksyes() {
        clearbooks()
    }

    return (
        <BtnBig
            bClassName="btn btn-red"
            bText="Clear all my books"
            bOnClick={() => clearbooksyes()}
        />
    )
}
export default ClearMyBooks
