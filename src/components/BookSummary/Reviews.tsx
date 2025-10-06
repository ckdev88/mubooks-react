// NOTE: tropes only shown when book is finished and/or user populated, possible via AddBookPage
import ReviewTropes from "@/components/BookSummary/ReviewTropes"
import BookSummaryReview from "@/components/BookSummary/Review"

const pagesShowReviewTropes: Page[] = ["finished", "favourites", "savedbooks", "tropes"]
const pagesShowReviewText: Page[] = ["finished", "favourites", "savedbooks", "tropes"]
const pagesShowReviewQuote: Page[] = ["quoted", "dashboard", "tropes"]

interface Props {
    currentPage: Page
    book: Book
    readOnly?: boolean
    editMode: boolean
}
export default function SummaryReviews({ currentPage, book, readOnly, editMode }: Props) {
    return (
        <div className="reviews">
            {pagesShowReviewQuote.includes(currentPage) && (
                <BookSummaryReview
                    book_id={book.id}
                    o_key="review_fav_quote"
                    review_text={book.review_fav_quote}
                    readOnly={readOnly}
                    editMode={editMode}
                />
            )}
            {pagesShowReviewText.includes(currentPage) && (
                <BookSummaryReview
                    book_id={book.id}
                    o_key="review_text"
                    review_text={book.review_text}
                    readOnly={readOnly}
                    editMode={editMode}
                />
            )}
            {pagesShowReviewTropes.includes(currentPage) && (
                <ReviewTropes book={book} tropes={book.review_tropes} editMode={editMode} />
            )}
        </div>
    )
}
