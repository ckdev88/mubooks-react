import { useContext, useState } from "react"
import { AppContext } from "../App"
import getListName from "../functions/getListName"
import useUpdateDb from "./useUpdateDb"
import assignListById from "../utils/assignListById"

// TODO: apply these messages for better feedback
// TODO: would be even nicer if the notifications are clickable to targeted listname
// const mesg = {
//     finished_to_reading: "Unfinished, moved to READING",
//     x_to_wishlist: "Moved back to WISHLIST",
//     tossed: "Tossed it",
//     permtossed: "Permanently tossed",
//     wishlist_added: "Added to WISHLIST",
//     reading_added: "Added to READING",
//     finished_added: "Added to FINISHED",
//     favorite_added: "Added to FAVOURITES",
//     favorite_removed: "Removed from favourites",
// }

const useMyBooksRemove = ({
    book,
    removeType,
    targetList,
}: { book: Book; removeType: "move" | "toss" | "untoss" | "permatoss"; targetList?: BookList }): [
    () => void,
    boolean,
] => {
    // console.log("letsago, useMyBooksAdd,", targetList)
    // console.log(book, targetList)
    const { setPopupNotification, userMyBooks, setUserMyBooks, setRerender } =
        useContext(AppContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initUpdateDb = useUpdateDb({
        msg: targetList
            ? "Removed from " + getListName(targetList).toUpperCase() + " list"
            : "Tossed",
        logMsg:
            book.title_short + " added to " + (targetList && getListName(targetList).toUpperCase()),
    })

    async function MyBooksUpdate(myBooksNew: Books) {
        // OPTIMIZE ewwwwwww brother ewwwwwww, see also ./useMyBooksAdd.ts
        console.log("myBooksNew:", myBooksNew)
        setUserMyBooks(myBooksNew)
        setPopupNotification("optimist")
        const notification: string = await initUpdateDb()
        setIsLoading(false)
        setPopupNotification(notification)
        setRerender(true)
    }

    async function RemoveBookFromX(): Promise<void> {
        let myBooks: Books = []
        if (userMyBooks !== undefined) myBooks = userMyBooks

        // TODO cache or put in pure function
        switch (removeType) {
            case "move":
                switch (book.list) {
                    case 4:
                        switch (targetList) {
                            case 3:
                                return MyBooksUpdate(assignListById(myBooks, book.id, 2)) // finished favourite > reading
                            default:
                                return MyBooksUpdate(assignListById(myBooks, book.id, 3)) // favourite > finished
                        }
                    case 3:
                        return MyBooksUpdate(assignListById(myBooks, book.id, 2)) // finished > reading
                    case 2:
                        return MyBooksUpdate(assignListById(myBooks, book.id, 1)) // reading > wishlist
                    case 1:
                        return MyBooksUpdate(assignListById(myBooks, book.id, 1, "toss")) // wishlist > tossed
                }
                break
            case "toss":
                return MyBooksUpdate(assignListById(myBooks, book.id, book.list, "toss")) // toss book into trash
            case "untoss": // restore from trash into original list
                return MyBooksUpdate(assignListById(myBooks, book.id, book.list, "untoss"))
            case "permatoss": // remove book completely
                return MyBooksUpdate(assignListById(myBooks, book.id, book.list, "permatoss"))
        }
    }

    const RemoveBookFromXButtonAct = (): void => {
        setIsLoading(true)
        RemoveBookFromX()
    }

    return [RemoveBookFromXButtonAct, isLoading]
}
export default useMyBooksRemove
