import { useContext } from "react"
import { BooksOverviewFilterContext } from "../routes/books/BooksOverviewPage"

const BooksOverviewFilterResultsMessage = () => {
    const { booksFilter, booksList } = useContext(BooksOverviewFilterContext)
    return (
        <div className="h2 resultsfound mt0i">
            {booksFilter.length > 0 && booksList.length > 0 ? (
                <>
                    {booksList.length} book
                    {booksList.length !== 1 && "s"} found for <em>"{booksFilter}"</em>
                </>
            ) : booksFilter.length > 0 && booksList.length === 0 ? (
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
