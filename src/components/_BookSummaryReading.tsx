import BookAuthorList from './BookAuthorList'
import RemoveBookButton from './RemoveBookButton'
import AddToReadingButton from './AddToReadingButton'
import RemoveFromReadingButton from './RemoveFromReadingButton'
import AddToFinishedButton from './AddToFinishedButton'

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
					{book.pg} pagess asdfasdf
					<br />
				</div>
			</header>
			<footer>
				<div className="marks">
					<div className="mark">
						{book.saved && RemoveBookButton(book.id, book?.saved)}<br />
						{!book.reading && AddToReadingButton(book)}
						{book.reading && RemoveFromReadingButton(book.id)}<br />
						{book.reading && AddToFinishedButton(book.id)}<br />
					</div>
				</div>
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary