import { useContext } from "react"
import { AppContext } from "../App"
import useMyBooksUpdateDb from "../hooks/useMyBooksUpdateDb"
import BtnBig from "./ui/BtnBig"

export default function TossTossers() {
    const { userMyBooks, setUserMyBooks } = useContext(AppContext)
    const newArr = userMyBooks.filter((book) => book.tossed !== true)

    const clearbooks = useMyBooksUpdateDb({
        myBooksNew: newArr,
        book_id: null,
        msg: "Books tossed",
    })
    function clearbooksyes() {
        clearbooks()
        setUserMyBooks(newArr)
    }
    return (
        <div className="py1 mb1">
            <BtnBig
                bClassName="btn btn-red"
                bText="Permanently toss all these books"
                bOnClick={() => clearbooksyes()}
            />
        </div>
    )
}
