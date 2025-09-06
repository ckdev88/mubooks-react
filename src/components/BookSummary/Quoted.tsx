import BookSummaryReview from "@/components/BookSummary/Review"
import BookSummaryTitle from "@/components/BookSummary/Title"

const BookSummaryQuoted = ({
    book,
    currentPage,
    special,
    refer,
}: { book: Book; currentPage: Page; special?: "quote" | "quote2"; refer: string }) => {
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
                refer={refer}
            />
        </div>
    )
}
export default BookSummaryQuoted
