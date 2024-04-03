import BookAuthorList from './BookAuthorList'
import SaveBookButton from './SaveBookButton'
import RemoveBookButton from './RemoveBookButton'

const BookSummary = ({ book }: BookObject) => {
	return (
		// TODO: add className for when marked as saved
		<article className="book-summary" key={book.id}>
			<header>
				<aside className="cover">
					<img src={book.cover} alt="" />
				</aside>
				<div className="in-short">
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
						{SaveBookButton(book)}
						{RemoveBookButton(book.id,book.saved)}
					</div>
				</div>
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
