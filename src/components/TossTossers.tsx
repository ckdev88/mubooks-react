import { useContext, useState } from "react"
import { AppContext } from "../App"
import useMyBooksUpdateDb from "../hooks/useMyBooksUpdateDb"
import BtnBig from "./ui/buttons/BtnBig"

const TossTossers = () => {
    const { userMyBooks, setUserMyBooks } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [newArray, setNewArray] = useState<Books>(userMyBooks.filter((book) => !book.tossed))
    const newArr: Books = userMyBooks.filter((book) => !book.tossed)

    const updateMyBooksDb = useMyBooksUpdateDb({
        myBooksNew: newArray,
        book_id: null,
        msg: "Books tossed",
    })
    function clearbooksyes() {
        setIsLoading(true)
        setUserMyBooks(newArr.filter((book) => !book.tossed))
        setNewArray(newArr.filter((book) => !book.tossed))
        updateMyBooksDb()
        setIsLoading(false)
    }
    return (
        <div className="py1 mb1">
            <BtnBig
                bClassName="btn btn-red"
                bText="Permanently toss all these books"
                bOnClick={() => clearbooksyes()}
                bIsLoading={isLoading}
            />
        </div>
    )
}
export default TossTossers
