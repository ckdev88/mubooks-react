import { useContext } from "react"
import { BooksOverviewFilterContext } from "../routes/books/BooksOverviewPage"

const BooksOverviewFilterResultsMessage = () => {
    const { booksFilter, booksOverview } = useContext(BooksOverviewFilterContext)
    return (
        <div className="h2 resultsfound mt0i">
            {booksFilter.length > 0 && booksOverview.length > 0 ? (
                <>
                    {booksOverview.length} book
                    {booksOverview.length !== 1 && "s"} found for <em>"{booksFilter}"</em>
                </>
            ) : booksFilter.length > 0 && booksOverview.length === 0 ? (
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
