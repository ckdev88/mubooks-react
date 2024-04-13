import { useContext } from 'react'
import { AppContext } from '../../App'
import BookSummary from '../BookSummary'
import { Link } from 'react-router-dom'

// TODO: add deck of "cards" to show first n of saved books (covers)

const SavedItems = () => {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	let booksParsed: Books = JSON.parse(userMyBooks)
	if (typeof booksParsed !== 'object') booksParsed = JSON.parse(booksParsed)
	const booksarr = booksParsed
	if (booksarr.length > 0) hasbooks = true

	function DeckCovers(booksarr: Books) {
		if (booksarr.length === 1) {
			return booksarr.map((book: Book) => {
				return <BookSummary book={book} key={book.id} />
			})
		}
		return (
			<Link to="/saved-books">
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
				<main className="saved deck">{DeckCovers(booksarr)}</main>
			) : (
				<Link to="/saved">
					<main className="toadd">
						<aside>
							<button>
								<img src="img/save-books-icon.png" />
							</button>
						</aside>
						Let's start saving books.
					</main>
				</Link>
			)}
		</>
	)
}
export default SavedItems
