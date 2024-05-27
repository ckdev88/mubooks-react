import { Link } from 'react-router-dom'
import BooksOverviewPage from './BooksOverviewPage'
import { useContext } from 'react'
import { AppContext } from '../../App'

const QuotedPage = () => {
	const { userMyBooks } = useContext(AppContext)
	let quotedbooks: Books
	let hasBooks: boolean = false
	if (userMyBooks === undefined) quotedbooks = []
	if (userMyBooks.length > 0) {
		quotedbooks = userMyBooks.filter(
			(book) => book.review_fav_quote && book.review_fav_quote !== '' && book.rate_spice === 5
		)
		if (quotedbooks.length > 0) hasBooks = true
	} else quotedbooks = []

	return (
		<>
			<h1>
				My Quotes <sub>My books with quotes to remember: {quotedbooks.length}</sub>
			</h1>
			<div className={hasBooks === true ? 'dnone' : 'dblock'}>
				<h4>No books added yet, find them and add them.</h4>
				<p>
					<Link to={'/search'} className="wauto">
						Search
					</Link>
				</p>
			</div>
			<BooksOverviewPage books={quotedbooks} page="quotedbookspage" />
		</>
	)
}
export default QuotedPage