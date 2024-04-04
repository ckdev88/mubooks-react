import BookAuthorList from './BookAuthorList'
import SaveBookButton from './SaveBookButton'
import RemoveBookButton from './RemoveBookButton'
import AddToWishlistButton from './AddToWishlistButton'
import RemoveFromWishlistButton from './RemoveFromWishlistButton'

const BookSummary = ({ book }: BookObject) => {
	return (
		// TODO: add className for when marked as saved
		<article className="book-summary" key={book.id}>
			<header>
				<aside className="cover">
					<img src={book.cover} alt="" />
				</aside>
				<div className="in-short">
					{book.saved?'saved':'not saved'}<br/>
					{book.wishlist?'wishlist':'not wishlist?'}
					<h2>
						{book.title_short}
						<sub>{BookAuthorList(book)}</sub>
					</h2>
					{book.date_published}
					<br />
					{book.pages} pages
					<br />
				</div>
			</header>
			<footer>
				<div className="marks">
					<div className="mark">
						{!book.saved && SaveBookButton(book)}
						{book.saved && RemoveBookButton(book.id, book.saved)}<br />
						{!book.wishlist && AddToWishlistButton(book.id)}
						{book.wishlist && RemoveFromWishlistButton(book.id)}<br />
					</div>
				</div>
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
