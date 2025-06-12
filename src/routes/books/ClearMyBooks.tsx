import { useContext } from "react"
import { AppContext } from "../../App"
import useMyBooksUpdateDb from "../../hooks/useMyBooksUpdateDb"
import BtnBig from "../../components/ui/BtnBig"

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

    return <BtnBig bClassName="btn btn-red" bText="Clear all my books" bOnClick={() => clearbooksyes()} />
}
export default ClearMyBooks
