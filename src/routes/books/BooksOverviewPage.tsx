import { useState, useContext, useEffect, createContext, useLayoutEffect } from "react"
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

    useLayoutEffect(() => {
        // useEffect would create a flash of old state on updating state (toss, restore, or unfav on favs page) ... TODO make it better/faster?
        setBooksOverview(books)
    }, [books])

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
