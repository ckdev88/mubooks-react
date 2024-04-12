import { useContext } from 'react'
import { AppContext } from '../../App'
import BookSummary from '../BookSummary'
import { Link } from 'react-router-dom'

export default function FinishedItems() {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	let booksParsed: Books = JSON.parse(userMyBooks)
	if (typeof booksParsed !== 'object') booksParsed = JSON.parse(booksParsed)
	const booksarr = booksParsed.filter((book: Book) => book.finished === true)
	if (booksarr.length > 0) hasbooks = true

	function DeckCovers(booksarr: Books) {
		if (booksarr.length === 1) {
			return booksarr.map((book: Book) => {
				return <BookSummary book={book} key={book.id} />
			})
		}
		return (
			<Link to="/finished">
				<div className="deck-container">
					{booksarr.slice(-6).map((book: Book, index: number) => {
						var img = 'https://images.isbndb.com/covers' + book.img + '.jpg'
						return (
							<article
								className="book-cover"
								key={book.id}
								style={{ zIndex: 10 - index }}
							>
								<img src={img} />
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
				<main className="finished deck">{DeckCovers(booksarr)}</main>
			) : (
				<Link to="/finished">
					<main className="toadd">
						<aside>
							<button>
								<img src="img/icon-finished.png" />
							</button>
						</aside>
						Books I finished reading.
					</main>
				</Link>
			)}
		</>
	)
}