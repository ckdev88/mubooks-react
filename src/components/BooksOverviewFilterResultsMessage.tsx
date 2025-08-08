import { useContext } from "react"
import { BooksOverviewFilterContext } from "../pages/books/BooksOverviewPage"

const BooksOverviewFilterResultsMessage = () => {
    const { booksFilter, booksOverview } = useContext(BooksOverviewFilterContext)
    if (booksFilter === undefined || booksOverview === undefined) return

    return (
        <div className="h2 resultsfound mt0i">
            {booksFilter.length > 1 && booksOverview.length > 0 ? (
                <>
                    {booksOverview.length} book
                    {booksOverview.length !== 1 && "s"} found for <em>"{booksFilter}"</em>
                </>
            ) : booksOverview !== undefined && booksOverview.length === 0 ? (
                <>
                    No books found for <em>"{booksFilter}"</em>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
export default BooksOverviewFilterResultsMessage
