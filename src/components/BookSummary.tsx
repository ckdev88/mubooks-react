import BookAuthorList from './BookAuthorList'
import SaveBookButton from './SaveBookButton'
import RemoveBookButton from './RemoveBookButton'
import AddToWishlistButton from './AddToWishlistButton'
import RemoveFromWishlistButton from './RemoveFromWishlistButton'
import AddToReadingButton from './AddToReadingButton'
import AddToFinishedButton from './AddToFinishedButton'
import AddToFavoritesButton from './AddToFavoritesButton'
import RemoveFromFavoritesButton from './RemoveFromFavoritesButton'

const BookSummary = ({ book }: BookObject) => {
	return (
		// TODO: add className for when marked as saved
		<article className="book-summary" key={book.id}>
			<header>
				<aside className="cover">
					<img src={book.cover !== undefined ? book.cover : 'img/coverless.png'} alt="" />
				</aside>
				<div className="in-short">
					<h2>
						{book.title_short}
						<sub>{BookAuthorList(book)}</sub>
					</h2>
					{book.dp}
					<br />
					{book.pg} pages
					<br />
				</div>
			</header>
			<footer>
				<div className="marks">
					<div className="mark">
						{!book.saved && SaveBookButton(book)}
						{book.saved && RemoveBookButton(book.id, book?.saved)}
						{!book.wishlist &&
							!book.reading &&
							!book.finished &&
							AddToWishlistButton(book)}
						{book.wishlist && RemoveFromWishlistButton(book.id, book?.wishlist)}
						{!book.reading && !book.finished && AddToReadingButton(book)}
						{book.reading && AddToFinishedButton(book.id)}
						{!book.favorite &&
							!book.reading &&
							!book.wishlist &&
							book.finished &&
							AddToFavoritesButton(book)}
						{book.favorite && RemoveFromFavoritesButton(book.id, book?.favorite)}
					</div>
				</div>
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
