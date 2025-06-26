import BtnBig from "./ui/buttons/BtnBig"
import useMyBooksRemove from "../hooks/useMyBooksRemove"

const TossTossers = () => {
    // const newArr: Books = userMyBooks.filter((book) => !book.tossed)
    const removeBookFromXButtonAct = useMyBooksRemove({
        book: undefined,
        removeType: "permatoss_tossers",
        targetList: undefined,
    })

    // function clearbooksyes() {
    // setUserMyBooks(newArr.filter((book) => !book.tossed))
    // updateDb({ msg: "lallaa", userid: userid, newJson: newArr.filter((book) => !book.tossed) })
    // setIsLoading(false)
    // }
    return (
        <div className="py1 mb1">
            <BtnBig
                bOnClick={removeBookFromXButtonAct}
                bClassName="btn btn-red"
                bText="PERMANENTLY toss all these books"
            />
        </div>
    )
}
export default TossTossers
