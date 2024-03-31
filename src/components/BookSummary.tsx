import BookAuthorList from "./BookAuthorList"
import addBookToSaved from "../stores/addBookToSaved"
import removeBookFromSaved from "../stores/removeBookFromSaved"
export default function BookSummary(book: Book) {
	console.log('boek', book)
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
						<a onClick={() => addBookToSaved(book)}>
							<span className="icon icon-add"></span>Save in my books
						</a>
						<br />
						<a onClick={() => removeBookFromSaved(book.id)}>
							<span className="icon icon-remove"></span>Remove from my books
						</a>
					</div>
				</div>
				<hr />
			</footer>
		</article>
	)
}
