import { useState, useContext, useEffect, createContext, useLayoutEffect } from "react"
import BookSummary from "../../components/BookSummary"
import { AppContext } from "../../App"
import BooksOverviewFilterSort from "../../components/BooksOverviewFilterSort"
import { TropesPageContext } from "./TropesPage"

/** Array of pages which should have a search field to filter the list */
const fsPages: Page[] = ["wishlist", "finished", "favorites", "savedbooks"]

export const BooksOverviewFilterContext = createContext<BooksOverviewFilterContextType>(
    {} as BooksOverviewFilterContextType,
)

const BooksOverviewPage = ({
    books,
    page,
    booklist,
}: {
    books?: Books
    page: Page
    booklist: Book["list"] | undefined
}) => {
    const { userMyBooks } = useContext(AppContext)
    const { tropesInMyBooksArr } = useContext(TropesPageContext)

    let hasbooks: boolean
    let booklistStart: Books
    if (books !== undefined && books.length > 0) {
        hasbooks = true
        booklistStart = books
        // printed at all bookpages, besides wishlist, favourites
    } else {
        hasbooks = false
        // this is printed at wishlist, favourites
    }

    // if (page === "tossed") booklistStart = userMyBooks.filter((book: Book) => book.tossed === true)
    // if (page === "finished") {
    //     // OPTIMIZE this looks like garbage
    //     booklistStart = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
    //     books = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
    // }
    if (page === "tropes") books = tropesInMyBooksArr

    let hasfilter: boolean
    if (fsPages.includes(page) && hasbooks) hasfilter = true
    else hasfilter = false

    const [booksFilter, setBooksFilter] = useState<string>("")
    const [booksList, setBooksList] = useState<Books>(books ? books : userMyBooks)

    // PER LIST
    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO OPTIMIZE>
    useLayoutEffect(() => {
        let bookstmp: Books = []
        if (books !== undefined && books.length > 0) {
            // this is the default, should always work with pages
            // just not with WISHLIST & FAVOURITES
            bookstmp = books
        } else if (booklist) {
            if (booklist === 3)
                bookstmp = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
            else {
                if (page === "tossed") bookstmp = userMyBooks.filter((book) => book.tossed === true)
                else bookstmp = userMyBooks.filter((book) => book.list === booklist && !book.tossed)
            }

            if (booklist === 3 || booklist === 4) {
                bookstmp.sort((a, b) => (b.date_finished ?? 0) - (a.date_finished ?? 0))
            }
        }
        setBooksList(bookstmp)
    }, [userMyBooks])

    // TROPES
    // biome-ignore lint/correctness/useExhaustiveDependencies: trigger when tropesInMyBooksArr is modified
    useEffect(() => {
        if (page === "tropes") setBooksList(tropesInMyBooksArr)
    }, [tropesInMyBooksArr])

    // FILTERED
    // biome-ignore lint/correctness/useExhaustiveDependencies: only trigger on booksFilter change
    useEffect(() => {
        if (hasfilter)
            setBooksList(
                booklistStart.filter((book) =>
                    book.title_short.toLowerCase().includes(booksFilter),
                ),
            )
    }, [booksFilter])

    // biome-ignore lint/correctness/useExhaustiveDependencies: <Only run once via []>
    useEffect(() => {
        // jump to # of book after clicking a specific book
        if (fsPages.includes(page)) {
            if (window.location.hash !== undefined && window.location.hash !== "") {
                setTimeout(() => {
                    location.href = window.location.hash
                }, 500)
            }
        }
    }, [])

    return (
        <>
            {fsPages.includes(page) && (
                <div>
                    {hasfilter && (
                        <BooksOverviewFilterContext.Provider
                            value={{ setBooksFilter, booksFilter }}
                        >
                            <BooksOverviewFilterSort />
                            <div className="h2 resultsfound mt0i">
                                {booksFilter.length > 0 && booksList.length > 0 ? (
                                    <>
                                        {booksList.length} book
                                        {booksList.length !== 1 && "s"} found for{" "}
                                        <em>"{booksFilter}"</em>
                                    </>
                                ) : booksFilter.length > 0 && booksList.length === 0 ? (
                                    <>
                                        No books found for <em>"{booksFilter}"</em>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </BooksOverviewFilterContext.Provider>
                    )}
                </div>
            )}
            {page === "search" ? (
                <>
                    {books?.map((book) => {
                        userMyBooks.find((savedbook) => {
                            if (savedbook.id === book.id) {
                                book.list = savedbook.list
                                book.date_reading = savedbook.date_reading
                                book.date_finished = savedbook.date_finished
                            }
                        })
                        return (
                            <BookSummary
                                book={book}
                                key={`BookSummary${book.id}`}
                                currentPage={page}
                            />
                        )
                    })}
                </>
            ) : booksFilter.length > 0 ? (
                booksList.map((book) => {
                    return (
                        <BookSummary book={book} key={`BookSummary${book.id}`} currentPage={page} />
                    )
                })
            ) : (
                books?.map((book) => {
                    // if (
                    //     book.list === booklist ||
                    //     page === "tropes" ||
                    //     booklist === undefined ||
                    //     (booklist === 3 && book.list === 4)
                    // ) {
                    return (
                        <BookSummary book={book} key={`BookSummary${book.id}`} currentPage={page} />
                    )
                    // }
                })
            )}
        </>
    )
}
export default BooksOverviewPage
