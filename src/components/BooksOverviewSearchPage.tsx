import BookSummary from "@/components/BookSummary"
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"

/**
 * Maps through search results to match with saved books to show data, e.g. date_reading, date_finished
 * @returns JSX.Element: `BookSummary` component
 */
export default function BooksOverviewSearchPage({ books }: { books: Books }) {
    const { userMyBooks } = useContext(AppContext)
    if (userMyBooks === undefined) return

    const page: Page = "search"
    return (
        <>
            {books?.map((book: Book, index) => {
                userMyBooks.find((savedbook) => {
                    if (savedbook.id === book.id) {
                        book.list = savedbook.list
                        book.date_reading = savedbook.date_reading
                        book.date_finished = savedbook.date_finished
                    }
                })
                return (
                    <>
                        <BookSummary
                            book={book}
                            key={`BookSummary${book.id}${index}`}
                            currentPage={page}
                        />
                    </>
                )
            })}
        </>
    )
}
