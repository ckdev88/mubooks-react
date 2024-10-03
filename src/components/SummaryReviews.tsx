import ReviewTropes from './ReviewTropes'
import BookSummaryReview from './BookSummaryReview'

export default function SummaryReviews({ currentPage, book }: { currentPage: Page; book: Book }) {
	return (
		<div className="reviews">
			{currentPage === 'quoted' && (
				<BookSummaryReview book_id={book.id} o_key="review_fav_quote" review_text={book.review_fav_quote} />
			)}
			{(currentPage === 'finished' || currentPage === 'favorites' || currentPage === 'savedbooks') && (
				<>
					<BookSummaryReview book_id={book.id} o_key="review_text" review_text={book.review_text} />
					{book.review_tropes && <ReviewTropes book={book} tropes={book?.review_tropes} />}
				</>
			)}
		</div>
	)
}
