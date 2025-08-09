import { useState, useContext, useEffect, createContext, useMemo } from "react"
import BookSummary from "@/components/BookSummary/BookSummary"
import BooksOverviewFilterSort from "@/components/BooksOverviewFilterSort"
import { TropesPageContext } from "@/pages/Tropes"
import BooksOverviewPageQuoted from "@/components/BooksOverviewPageQuoted"
import BooksOverviewFilterResultsMessage from "@/components/BooksOverviewFilterResultsMessage"
import BooksOverviewSearchPage from "@/components/BooksOverviewSearchPage"

// Array of pages which should have a search field to filter the list
const fsPages: Page[] = ["wishlist", "finished", "favourites", "savedbooks"]

export const BooksOverviewFilterContext = createContext<BooksOverviewFilterContextType>(
    {} as BooksOverviewFilterContextType,
)

// Memoize the filter function to prevent recreation on every render
const filterBooks = (books: Books, filterValue: string): Books => {
    if (!filterValue || filterValue.length === 1) return books

    const lowerFilter = filterValue.toLowerCase()
    return books?.filter(
        (book) =>
            book.title_short.toLowerCase().includes(lowerFilter) ||
            book.author_name.join("").toLowerCase().includes(lowerFilter),
    )
}

const BooksOverviewPage = ({
    books,
    page,
}: {
    books: Books
    page: Page
}) => {
    const { tropesInMyBooksArr } = useContext(TropesPageContext)
    const [booksFilter, setBooksFilter] = useState<BooksFilterValue>(undefined)

    // Determine if we should show filters
    const hasBooks = books !== undefined && books?.length > 0
    const hasFilter = fsPages.includes(page) && hasBooks

    // Memoize the current book list based on page and other conditions
    const currentBookList = useMemo(() => {
        return page === "tropes" ? tropesInMyBooksArr : books
    }, [page, books, tropesInMyBooksArr])

    // Memoize the filtered books
    const filteredBooks = useMemo(() => {
        if (!booksFilter || booksFilter.length === 1) return currentBookList
        return filterBooks(currentBookList, booksFilter)
    }, [currentBookList, booksFilter])

    // Handle hash navigation (only runs once on mount)
    useEffect(() => {
        if (fsPages.includes(page) && window.location.hash) {
            const timer = setTimeout(() => {
                location.href = window.location.hash
            }, 400)
            return () => clearTimeout(timer)
        }
    }, [page])

    // Memoize the context value to prevent unnecessary re-renders
    const filterContextValue = useMemo(
        () => ({
            setBooksFilter,
            booksFilter,
            booksOverview: filteredBooks,
        }),
        [booksFilter, filteredBooks],
    )

    // Render different views based on page type
    const renderBooks = () => {
        switch (page) {
            case "search":
                return <BooksOverviewSearchPage books={books} />
            case "quoted":
                return (
                    <BooksOverviewPageQuoted
                        books={filteredBooks?.filter((book: Book) => !book.tossed)}
                        page={page}
                    />
                )
            default:
                return filteredBooks?.map((book) => (
                    <BookSummary
                        book={book}
                        key={`BookSummary${book.list}${book.id}`}
                        currentPage={page}
                    />
                ))
        }
    }

    return (
        <>
            {hasFilter && (
                <div>
                    <BooksOverviewFilterContext.Provider value={filterContextValue}>
                        <BooksOverviewFilterSort />
                        <BooksOverviewFilterResultsMessage />
                    </BooksOverviewFilterContext.Provider>
                </div>
            )}
            {renderBooks()}
        </>
    )
}

export default BooksOverviewPage
