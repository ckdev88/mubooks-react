import { useState, useContext, useEffect, createContext } from "react"
import BookSummary from "../../components/BookSummary"
import BooksOverviewFilterSort from "../../components/BooksOverviewFilterSort"
import { TropesPageContext } from "./TropesPage"
import BooksOverviewPageQuoted from "../../components/BooksOverviewPageQuoted"
import BooksOverviewFilterResultsMessage from "../../components/BooksOverviewFilterResultsMessage"
import BooksOverviewSearchPage from "../../components/BooksOverviewSearchPage"

/** Array of pages which should have a search field to filter the list */
const fsPages: Page[] = ["wishlist", "finished", "favourites", "savedbooks"]

export const BooksOverviewFilterContext = createContext<BooksOverviewFilterContextType>(
    {} as BooksOverviewFilterContextType,
)

const BooksOverviewPage = ({
    books,
    page,
    booklist,
}: {
    books: Books
    page: Page
    booklist: Book["list"] | undefined
}) => {
    console.log("booklist doesnt seem te be used...", booklist) // TODO weg of houden?
    const { tropesInMyBooksArr } = useContext(TropesPageContext)

    const booklistStart: Books = books
    const hasbooks: boolean = books !== undefined && books.length > 0

    if (page === "tropes") books = tropesInMyBooksArr // OPTIMIZE, shouldnt this come via `books` param?

    const hasfilter: boolean = fsPages.includes(page) && hasbooks

    const [booksFilter, setBooksFilter] = useState<string>("")
    const [booksOverview, setBooksOverview] = useState<Books>(books)

    useEffect(() => {
        setBooksOverview(books)
    }, [books])

    // PER LIST
    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO OPTIMIZE>
    // useEffect(() => {
    //     console.log("USERMYBOOKS changed? useEffect in BooksOverviewPage on userMyBooks triggered")
    //     let bookstmp: Books = []
    //     if (books !== undefined && books.length > 0) {
    //         bookstmp = books // this is the default, should always work with pages
    // if (page === "finished") {
    //     bookstmp = userMyBooks.filter(
    //         (book: Book) => !book.tossed && (book.list === 3 || book.list === 4),
    //     )
    //     setBooksOverview(bookstmp)
    //     return
    // }
    //     if (page === "tossed") {
    //         console.log("... in TOSSED")
    //         bookstmp = userMyBooks.filter((book: Book) => book.tossed === true && book.list > 0)
    //         setBooksOverview(bookstmp)
    //         return
    //     }
    // } else if (booklist) {
    // if (booklist === 3) {
    //     bookstmp = userMyBooks.filter((book: Book) => book.list === 3 || book.list === 4)
    // } else {
    //     if (page === "tossed") {
    //         bookstmp = userMyBooks.filter((book) => book.tossed === true)
    //     } else
    //         bookstmp = userMyBooks.filter((book) => book.list === booklist && !book.tossed)
    // }

    // if (booklist === 3 || booklist === 4) {
    //     bookstmp.sort((a, b) => (b.date_finished ?? 0) - (a.date_finished ?? 0))
    // }
    //     }
    //     setBooksOverview(bookstmp)
    // }, [userMyBooks])

    // TROPES
    // biome-ignore lint/correctness/useExhaustiveDependencies: trigger when tropesInMyBooksArr is modified
    useEffect(() => {
        if (page === "tropes") setBooksOverview(tropesInMyBooksArr)
    }, [tropesInMyBooksArr])

    // FILTERED
    // biome-ignore lint/correctness/useExhaustiveDependencies: only trigger on booksFilter change
    useEffect(() => {
        if (hasfilter)
            setBooksOverview(
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
                            value={{ setBooksFilter, booksFilter, booksOverview }}
                        >
                            <BooksOverviewFilterSort />
                            <BooksOverviewFilterResultsMessage />
                        </BooksOverviewFilterContext.Provider>
                    )}
                </div>
            )}
            {page === "search" ? (
                <BooksOverviewSearchPage books={booklistStart} />
            ) : booksFilter.length > 0 ? (
                booksOverview.map((book) => (
                    <BookSummary book={book} key={`BookSummary${book.id}`} currentPage={page} />
                ))
            ) : page === "quoted" ? (
                <BooksOverviewPageQuoted
                    books={booksOverview.filter((book: Book) => !book.tossed)}
                    page={page}
                />
                // ) : page === "finished" || page === "reading" || page==="wishlist" || page==="favourites" || page==="tossed" ? (
            ) : (
                booksOverview.map((book) => {
                    return (
                        <BookSummary
                            book={book}
                            key={`BookSummary${book.list}${book.id}`}
                            currentPage={page}
                        />
                    )
                })
            )}
        </>
    )
}
export default BooksOverviewPage
