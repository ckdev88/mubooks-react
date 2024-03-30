import { useNavigate,Link } from 'react-router-dom'
import removeBookFromSaved from '../../stores/removeBookFromSaved'

type Author = string
interface Authors {
	author: Author
}
interface Book {
	id: number
	authors: [Authors]
	cover?: string
	date_published: string
	image?: string
	language: string
	pages: number
	saved?: boolean
	title?: string
	title_short: string
}
interface Books {
	book: Book
}

export default function SavedBooksPage() {
	const navigate = useNavigate()
	let hasbooks = false // TODO: make dynamic with either Ref or State

	let savedbooks: Books = []
	savedbooks = JSON.parse(localStorage.getItem('MyBooks'))

	function removeBook(id: number) {
		removeBookFromSaved(id)
		// TODO: manage global state array
	}

	function showSavedbooks() {
		return savedbooks.map((book) => {
			return (
				<>
					<article key={book.id} className="book-summary">
						<header>
							<aside className="cover">
								<img src={book.image!=='https://images.isbndb.com/coversnull'&&book.image?book.image:'/logo.svg'} alt="" />
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
									<a onClick={()=>removeBook(book.id)}>
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
					<Link to={ '/search' } className="wauto">
						Search
					</Link>
				</p>
			</div>
			<div>{showSavedbooks()}</div>
		</>
	)
}
