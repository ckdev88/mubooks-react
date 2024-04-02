import { Link } from 'react-router-dom'
import RemoveBookButton from '../../components/RemoveBookButton'
import BookAuthorList from '../../components/BookAuthorList'

export default function SavedBooksPage() {
	let hasbooks = false // TODO: make dynamic with either Ref or State
	let savedbooks: Books = JSON.parse(localStorage.getItem('MyBooks'))
	if (savedbooks === null) savedbooks = []

	const savedbookslist = savedbooks.map((book: Book) => {
		return (
			<article key={book.id} className="book-summary">
				<header>
					<aside className="cover">
						<img
							src={
								book.image !== 'https://images.isbndb.com/coversnull' && book.image
									? book.image
									: '/logo.svg'
							}
							alt=""
						/>
					</aside>
					<div className="in-short">
						<h2>
							{book.title_short}
							<sub>{BookAuthorList(book)}</sub>
						</h2>
						{book.date_published}
						<br />
						{book.pages} pages
					</div>
				</header>
				<footer>
					<div className="marks">
						<div className="mark">
							<RemoveBookButton id={book.id} />
						</div>
					</div>
					<hr />
				</footer>
			</article>
		)
	})

	/* function showSavedbooks() {
		if (savedbooks.length > 0) {
			return savedbooks.map((book) => {
				return (
					<>
						<article key={book.id} className="book-summary">
							<header>
								<aside className="cover">
									<img
										src={
											book.image !== 'https://images.isbndb.com/coversnull' && book.image
												? book.image
												: '/logo.svg'
										}
										alt=""
									/>
								</aside>
								<div className="in-short">
									<h2>
										{book.title_short}
										<sub>
											{book.authors.map((author: Author, index: number) => {
												return (
													<span key={index}>
														{author}
														<br />
													</span>
												)
											})}
										</sub>
									</h2>
									{book.date_published}
									<br />
									{book.pages} pages
								</div>
							</header>
							<footer>
								<div className="marks">
									<div className="mark">
										<a onClick={() => removeBook(book.id)}>
											<span className="icon icon-remove"></span>Remove from my books
										</a>
									</div>
								</div>
								<hr />
							</footer>
						</article>
					</>
				)
			})
		}
	} */

	return (
		<>
			<h1>My Books</h1>
			<p>
				An overview of my saved books, this includes books that are favorited, read and finished,
				the wishlist and the book currently reading.
			</p>
			<div className={!hasbooks && 'dnone'}>
				<h4>No books added yet, find them and add them.</h4>
				<p>
					<Link to={'/search'} className="wauto">
						Search
					</Link>
				</p>
			</div>
			<div>{savedbookslist}</div>
		</>
	)
}
