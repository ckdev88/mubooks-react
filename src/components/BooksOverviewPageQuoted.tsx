import BookSummary from "@/components/BookSummary"
const BooksOverviewPageQuoted = ({ books, page }: { books: Books; page: Page }) => (
    <>
        {books?.flatMap((book) =>
            [
                book.review_fav_quote && (
                    <BookSummary book={book} key={`BookSummary${book.id}-1`} currentPage={page} />
                ),
                book.review_fav_quote2 && (
                    <BookSummary
                        book={book}
                        key={`BookSummary${book.id}-2`}
                        currentPage={page}
                        special="quote2"
                    />
                ),
            ].filter(Boolean),
        )}
    </>
)
export default BooksOverviewPageQuoted
