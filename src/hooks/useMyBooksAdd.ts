import convertDate from "../helpers/convertDate"
import { useContext } from "react"
import { AppContext } from "../App"
import getListName from "../functions/getListName"
import { getBookCover } from "../Helpers"
import useUpdateDb from "./useUpdateDb"
import { notification as nm } from "../i18n/notifications"

const useMyBooksAdd = ({ book, targetList }: { book: Book; targetList: BookList }) => {
    const { setPopupNotification, userMyBooks, setUserMyBooks, todaysDateDigit } =
        useContext(AppContext)

    const initUpdateDb = useUpdateDb({
        msg: nm.Added_to + getListName(targetList, true),
        logMsg: book.title_short + nm.added_to + getListName(targetList).toUpperCase(),
    })

    async function MyBooksUpdate(myBooksNew: Books) {
        setUserMyBooks(myBooksNew)
        const notification: string = await initUpdateDb()
        setPopupNotification(notification)
    }

    // TODO move into utils/
    const fetchBookCoverRedir = async (bookCoverM: Book["cover"]): Promise<string> => {
        const bookCoverSrcRedir: string = await fetch(bookCoverM).then((res) => res.url)
        return bookCoverSrcRedir
    }

    const runMyBooksAdd = async (bookIsSaved: boolean): Promise<Books> => {
        let newUserMyBooks: Books = userMyBooks
        if (bookIsSaved === false) {
            let title_short: Book["title_short"]
            if (book.title.length > 55) title_short = book.title.slice(0, 55) + "..."
            else title_short = book.title

            const date_now = Number(convertDate(Date.now(), "digit"))
            let date_reading = 0
            if (targetList > 1) date_reading = date_now
            let date_finished = 0
            if (targetList > 2) date_finished = date_now

            const coverM = getBookCover(book.cover, "M")
            const bookCoverSrcRedir = await fetchBookCoverRedir(coverM)

            const newBook: Book = {
                author_key: book.author_key,
                author_name: book.author_name,
                cover: book.cover,
                cover_redir: bookCoverSrcRedir,
                cover_edition_key: book.cover_edition_key,
                date_finished: date_finished,
                date_reading: date_reading,
                first_publish_year: book.first_publish_year,
                id: book.id,
                img: book.img,
                list: targetList,
                number_of_pages_median:
                    book.number_of_pages_median === undefined ? 0 : book.number_of_pages_median,
                rate_spice: 0,
                rate_stars: 0,
                review_fav_quote: "",
                review_fav_quote2: "",
                review_text: "",
                review_tropes: [],
                title: book.title,
                title_short: title_short,
                tossed: false,
            }
            newUserMyBooks?.push(newBook)
        } else newUserMyBooks = userMyBooks // TODO: just update or keep intact.. not sure
        return newUserMyBooks
    }

    async function AddBookToX(): Promise<void> {
        let myBooks: Books = []
        if (userMyBooks !== undefined) myBooks = userMyBooks

        let bookIsSaved = false
        for (let i = 0; i < myBooks.length; i++) {
            if (myBooks[i].id === book.id) {
                bookIsSaved = true
                myBooks[i].list = targetList
                myBooks[i].tossed = false // always false when moving (restoring) to a list
                if (targetList === 2) myBooks[i].date_reading = todaysDateDigit
                if (targetList === 3) myBooks[i].date_finished = todaysDateDigit
                break
            }
        }
        if (bookIsSaved === false) myBooks = await runMyBooksAdd(bookIsSaved)
        MyBooksUpdate(myBooks)
    }

    const AddBookToXButtonAct = (): void => {
        AddBookToX()
    }

    return AddBookToXButtonAct
}
export default useMyBooksAdd
