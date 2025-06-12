import { useContext, useState } from "react"
import { AppContext } from "../App"
import getListName from "../functions/getListName"
import useMyBooksUpdateDb from "../hooks/useMyBooksUpdateDb"
import BtnPermToss from "./ui/BtnPermToss"
import BtnToss from "./ui/BtnToss"
import BtnTextGeneral from "./ui/BtnTextGeneral"

const mesg = {
    finished_to_reading: "Unfiniseeeeeeeehed, moved to Reading list",
    tossed: "Tossed it",
    permtossed: "Permanently tossed",
    wishlist_added: "Added to Wish list",
    reading_added: "Added to Reading list",
    finished_added: "Finished!",
    favorite_added: "Added to favourites!",
    favorite_removed: "Removed from favourites",
}

const RemoveBookFromXButton = ({
    book_id,
    book_list,
    targetList,
    icon,
    toss,
    permtoss,
    button_title,
}: {
    book_id: Book["id"]
    book_list: Book["list"]
    targetList: BookList
    icon?: boolean
    toss?: Book["tossed"]
    permtoss?: boolean
    button_title?: string
}) => {
    const { userMyBooks, setUserMyBooks } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [newArray, setNewArray] = useState<Books>(userMyBooks)
    let msg = ""

    if (targetList === 1 && book_list === 2) msg = "Moved back to wishlist"
    else if (permtoss === true) msg = mesg.permtossed
    else if (toss === true) msg = mesg.tossed
    else if (targetList > 0) {
        if ((book_list === 3 || book_list === 4) && targetList === 3) msg = mesg.finished_to_reading
        if (targetList === 4) msg = mesg.favorite_removed
    }

    const updateMyBooksDb = useMyBooksUpdateDb({
        myBooksNew: newArray,
        book_id: null,
        msg,
    })

    /**
     * Remove book from list where 1=Wishlist 2=Reading 3=Finished 4=Favorite
     */
    function RemoveBookFromX(book_id: Book["id"]): Books {
        let myBooks: Books
        if (userMyBooks === undefined) myBooks = []
        else myBooks = userMyBooks

        if (book_list === 4 && icon && targetList === 3) {
            // Move FINISHED > READING on favorited book, using "Remove from finished" button
            for (let i = 0; i < myBooks.length; i++)
                if (myBooks[i].id === book_id) {
                    myBooks[i].list = 2
                    break
                }
        } else if (book_list === 4 && icon) {
            // Remove from FAVORITES & unmark favorited in SAVED page, using heart icon
            for (let i = 0; i < myBooks.length; i++)
                if (myBooks[i].id === book_id) {
                    myBooks[i].list = 3
                    break
                }
        } else if (book_list === 3) {
            // Move Finished > READING on non-favorited book, using "Remove from finished" button
            for (let i = 0; i < myBooks.length; i++) {
                if (myBooks[i].id === book_id) {
                    myBooks[i].list = 2
                    myBooks[i].date_finished = undefined
                    break
                }
            }
        } else if (book_list === 2) {
            for (let i = 0; i < myBooks.length; i++) {
                if (myBooks[i].id === book_id) {
                    myBooks[i].list = 1
                    myBooks[i].date_reading = undefined
                    break
                }
            }
        } else if (book_list === 1) {
            // Move book to trash
            for (let i = 0; i < myBooks.length; i++) {
                if (myBooks[i].id === book_id) {
                    myBooks[i].tossed = true
                    break
                }
            }
        } else {
            let removeIndex = 0
            // Remove book completely
            for (let i = 0; i < myBooks.length; i++) {
                if (myBooks[i].id === book_id) {
                    removeIndex = i
                    break
                }
            }
            myBooks.splice(removeIndex, 1)
        }
        const myBooksNew: Books = myBooks
        return myBooksNew
    }

    function TossBook(book_id: Book["id"]): Books {
        const myBooks: Books = userMyBooks
        for (let i = 0; i < myBooks.length; i++) {
            if (myBooks[i].id === book_id) {
                myBooks[i].tossed = true
                break
            }
        }
        const myBooksNew: Books = myBooks
        return myBooksNew
    }

    function TossBookPerm(book_id: Book["id"]): Books {
        const myBooks: Books = userMyBooks
        let removeIndex = 0
        // Remove book completely
        for (let i = 0; i < myBooks.length; i++) {
            if (myBooks[i].id === book_id) {
                removeIndex = i
                break
            }
        }
        myBooks.splice(removeIndex, 1)
        const myBooksNew: Books = myBooks
        return myBooksNew
    }

    function fadeout(): void {
        /** Current Page, taken from url */
        // OPTIMIZE: this same function is used in RemoveBookFromXButton & AddBookToXButton
        const tcp = window.location.pathname.replace("/", "")
        if (
            (tcp === "reading" && targetList !== 2) ||
            (tcp === "wishlist" && targetList !== 1) ||
            (tcp === "favorites" && targetList !== 4) ||
            (tcp === "finished" && targetList !== 3 && targetList !== 4) ||
            (tcp === "tossed" && targetList > 0)
        ) {
            document.getElementById(`bookSummaryTransitioner${book_id}`)?.classList.add("fadeout")
        }
    }

    async function RemoveBookFromXButtonAct(
        meth: "move" | "toss" | "permtoss" = "move",
    ): Promise<void> {
        fadeout()
        setIsLoading(true)
        let newArr: Books = []
        if (meth === "move") newArr = RemoveBookFromX(book_id)
        if (meth === "toss") newArr = TossBook(book_id)
        if (meth === "permtoss") newArr = TossBookPerm(book_id)
        setUserMyBooks(newArray)
        setNewArray(newArr)
        await updateMyBooksDb()
        setIsLoading(false)
    }

    if (icon && targetList === 4 && !permtoss === true) {
        return (
            <span
                className="icon-heart active"
                onClick={() => RemoveBookFromXButtonAct("move")}
                onKeyDown={() => RemoveBookFromXButtonAct("move")}
            />
        )
    }

    return (
        <div className="mark">
            {permtoss === true ? (
                <BtnPermToss
                    bOnClick={() => RemoveBookFromXButtonAct("permtoss")}
                    bIsLoading={isLoading}
                />
            ) : (
                <>
                    {book_list > 1 && !toss === true && (
                        <BtnTextGeneral
                            bOnClick={() => RemoveBookFromXButtonAct("move")}
                            bIsLoading={isLoading}
                            bIcon={getListName(book_list - 1)}
                            bText={
                                button_title
                                    ? button_title
                                    : `Move back to ${getListName(book_list - 1)}`
                            }
                        />
                    )}
                    {toss === true && (
                        <BtnToss
                            bOnClick={() => RemoveBookFromXButtonAct("toss")}
                            bIsLoading={isLoading}
                        />
                    )}
                </>
            )}
        </div>
    )
}
export default RemoveBookFromXButton
