import { useContext } from "react"
import { AppContext } from "../App"
import getListName from "../functions/getListName"
// import initUpdateDb from "./useUpdateDb"
import assignListById from "../utils/assignListById"
import updateDb from "../utils/updateDb"

// TODO: apply these messages for better feedback
// TODO: would be even nicer if the notifications are clickable to targeted listname
const mesg = {
    finished_to_reading: "Unfinished, moved to READING",
    x_to_wishlist: "Moved back to WISHLIST",
    tossed: "Tossed it",
    permatossed: "Permanently tossed",
    wishlist_added: "Added to WISHLIST",
    reading_added: "Added to READING",
    finished_added: "Added to FINISHED",
    favourite_added: "Added to FAVOURITES",
    favourite_removed: "Removed from favourites",
    restored_to: "Restored to ",
    permatossed_tossers: "Permanently tossed all tossers",
}

const useMyBooksRemove = ({
    removeType,
    book,
    targetList,
}: {
    removeType: "move" | "toss" | "untoss" | "permatoss" | "permatoss_tossers"
    book?: Book
    targetList?: BookList
}) => {
    const { setPopupNotification, userMyBooks, setUserMyBooks, userid } = useContext(AppContext)
    // const [isLoading, setIsLoading] = useState<boolean>(false)

    /**
     * 1. Update `userMyBooks` state to value of passed `myBooksNew`.
     * 2. Update `database` with value of passed parameter `myBooksNew`
     * 3. Use return value `msg` to use in `setPopupNotification`
     */
    async function updateMyBooks(myBooksNew: Books, msg: string) {
        // OPTIMIZE ewwwwwww brother ewwwwwww, see also ./useMyBooksAdd.ts
        setUserMyBooks(myBooksNew)
        setPopupNotification("optimist")
        setPopupNotification(await updateMyBooksDb(myBooksNew, msg))
    }

    async function updateMyBooksDb(myBooksNew: Books, msg: string) {
        return updateDb({
            msg: msg,
            newJson: myBooksNew,
            userid: userid,
        })
    }

    /**
     * Removes all books from userMyBooks & database where `tossed` is true,
     * @returns updateMyBooksDb with respective params
     */
    async function removeBooksFromX(): Promise<void> {
        let myBooks: Books = []
        if (book) return // safequard, if `book` is defined, `removeBookFromX` is called
        if (removeType !== "permatoss_tossers") return
        if (userMyBooks !== undefined) myBooks = userMyBooks
        return updateMyBooks(
            myBooks.filter((mybook) => !mybook.tossed),
            mesg.permatossed_tossers,
        )
    }

    /**
     * Removes specific book from specific list,
     * @returns updateMyBooksDb with respective params
     */
    async function removeBookFromX(): Promise<void> {
        let myBooks: Books = []
        if (!book) return removeBooksFromX() // safequard, if `book` is not defined, `removeBooksFromX` is called
        if (userMyBooks !== undefined) myBooks = userMyBooks
        // TODO cache or put in pure function
        switch (removeType) {
            case "move":
                switch (book.list) {
                    case 4:
                        switch (targetList) {
                            case 3:
                                return updateMyBooks(
                                    assignListById(myBooks, book.id, 2),
                                    mesg.reading_added,
                                ) // finished favourite > reading
                            default:
                                return updateMyBooks(
                                    assignListById(myBooks, book.id, 3),
                                    mesg.favourite_removed,
                                ) // favourite > finished
                        }
                    case 3:
                        return updateMyBooks(
                            assignListById(myBooks, book.id, 2),
                            mesg.finished_to_reading,
                        ) // finished > reading
                    case 2:
                        return updateMyBooks(
                            assignListById(myBooks, book.id, 1),
                            mesg.wishlist_added,
                        ) // reading > wishlist
                    case 1:
                        return updateMyBooks(
                            assignListById(myBooks, book.id, 1, "toss"),
                            mesg.tossed,
                        ) // wishlist > tossed
                }
                break
            case "toss": // toss book into trash
                return updateMyBooks(
                    assignListById(myBooks, book.id, book.list, "toss"),
                    mesg.tossed,
                )
            case "untoss": // restore tossed > book.list
                return updateMyBooks(
                    assignListById(myBooks, book.id, book.list, "untoss"),
                    mesg.restored_to + getListName(book.list),
                )
            case "permatoss": // remove book completely
                return updateMyBooks(
                    assignListById(myBooks, book.id, book.list, "permatoss"),
                    mesg.permatossed,
                )
            case "permatoss_tossers":
                return
        }
    }

    /**
     * Start current hook
     * NOTE: setIsLoading(true/false) before/after executing is removed,
     * because the goal is to never have to show a loading while mutating userMyBooks.
     */
    const removeBookFromXButtonAct = (): void => {
        if (removeType === "permatoss_tossers") removeBooksFromX()
        else removeBookFromX()
    }

    // return [removeBookFromXButtonAct, isLoading]
    return removeBookFromXButtonAct
}
export default useMyBooksRemove
