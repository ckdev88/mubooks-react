import BookSummaryCover from "@/components/BookSummary/Cover"
import ReviewRating from "@/components/BookSummary/ReviewRating"

const reviewRatingPages: Page[] = ["finished", "favourites", "tropes", "savedbooks"]
interface Props {
    book: Book
    currentPage: Page
    editMode: boolean
}
const BookSummaryAside = ({ book, currentPage, editMode }: Props) => {
    return (
        <aside className="aside">
            <BookSummaryCover
                book_title_short={book.title_short}
                book_cover={book.cover}
                book_cover_redir={book.cover_redir}
            />
            {reviewRatingPages.includes(currentPage) && book.list > 2 && (
                <ReviewRating
                    book_id={book.id}
                    book_rate_stars={book.rate_stars}
                    book_rate_spice={book.rate_spice}
                    book_title_short={book.title_short}
                    editMode={editMode}
                />
            )}
        </aside>
    )
}
export default BookSummaryAside
