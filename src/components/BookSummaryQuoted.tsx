import BookSummaryReview from "./BookSummaryReview"
import BookSummaryTitle from "./BookSummaryTitle"

const BookSummaryQuoted = ({
    book,
    currentPage,
    special,
}: { book: Book; currentPage: Page; special?: "quote" | "quote2" }) => {
    return (
        <div className="quoteblock">
            {special === "quote2" ? (
                <BookSummaryReview
                    book_id={book.id}
                    o_key="review_fav_quote2"
                    review_text={book.review_fav_quote2}
                />
            ) : (
                <BookSummaryReview
                    book_id={book.id}
                    o_key="review_fav_quote"
                    review_text={book.review_fav_quote}
                />
            )}
            <BookSummaryTitle
                book_title_short={book.title_short}
                book_first_publish_year={book.first_publish_year}
                book_author_name={book.author_name}
                book_id={book.id}
                currentPage={currentPage}
                style="quoted"
            />
        </div>
    )
}
export default BookSummaryQuoted
