import { useContext } from "react"
import { AppContext } from "../../App"
import useMyBooksUpdateDb from "../../hooks/useMyBooksUpdateDb"
import BtnBigRed from "../../components/ui/BtnBigRed"

const newArr: [] = []
function ClearMyBooks() {
    const { setUserMyBooks } = useContext(AppContext)
    setUserMyBooks(newArr)
    const clearbooks = useMyBooksUpdateDb({
        myBooksNew: newArr,
        book_id: null,
        msg: "Books cleared",
    })
    function clearbooksyes() {
        clearbooks()
    }

    return <BtnBigRed bText="Clear all my books" bOnClick={() => clearbooksyes()} />
}
export default ClearMyBooks
