import { Link } from 'react-router-dom'
import BooksOverviewPage from './BooksOverviewPage'

export default function SavedBooksPage() {
	let hasbooks = false // TODO: make dynamic with either Ref or State

	let savedbooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		savedbooks = []
	}
	else savedbooks = JSON.parse(localStorage.getItem('MyBooks') as string)

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
			<BooksOverviewPage books={savedbooks} page="savedbookspage" />
		</>
	)
}
