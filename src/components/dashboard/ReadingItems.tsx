import { useContext } from 'react'
import { AppContext } from '../../App'
import BookSummary from '../BookSummary'
import { Link } from 'react-router-dom'
import BookSummaryCover from '../BookSummaryCover'

export default function ReadingItems() {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	const booksarr = userMyBooks.filter((book: Book) => book.list === 2)
	if (booksarr.length > 0) hasbooks = true

	function DeckCovers(booksarr: Books) {
		if (booksarr.length === 1) {
			return booksarr.map((book: Book) => {
				return <BookSummary book={book} key={book.id} currentPage="dashboard" />
			})
		}
		return (
			<Link to="/reading">
				<div className="deck-container">
					{booksarr.slice(-6).map((book: Book, index: number) => {
						return (
							<article className="book-cover" key={`deck_reading_books${book.id}`} style={{ zIndex: 10 - index }}>
								<BookSummaryCover book_cover={book.cover} book_cover_redir={book.cover_redir} book_id={book.id} />
							</article>
						)
					})}
				</div>
			</Link>
		)
	}

	return (
		<>
			{hasbooks ? (
				<main className="reading deck">{DeckCovers(booksarr)}</main>
			) : (
				<Link to="/reading">
					<main className="toadd">
						<aside>
							<button className="btn-icon">
								<img src="img/plus-icon.svg" />
							</button>
						</aside>
						Already reading a book? Let's add it here.
					</main>
				</Link>
			)}
		</>
	)
}
