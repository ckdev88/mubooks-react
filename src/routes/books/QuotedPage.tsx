import { Link } from 'react-router-dom'
import BooksOverviewPage from './BooksOverviewPage'
import { useContext } from 'react'
import { AppContext } from '../../App'
import Heading from '../../components/ui/Heading'

const pageTitle = 'Mu Quotes'
const currentPage = 'quoted'
const booklist = undefined

const QuotedPage = () => {
	const { userMyBooks } = useContext(AppContext)

	let quotedbooks: Books
	let hasbooks: boolean = false
	if (userMyBooks === undefined) quotedbooks = []
	if (userMyBooks.length > 0) {
		quotedbooks = userMyBooks.filter((book) => book.review_fav_quote && book.review_fav_quote !== '')
		if (quotedbooks.length > 0) hasbooks = true
	} else quotedbooks = []

	return (
		<>
			<Heading
				text={pageTitle}
				icon={'icon-quoted.svg'}
				sub={`My books with quotes to remember: ${quotedbooks.length}`}
			/>
			<div className={hasbooks === true ? 'dnone' : 'dblock'}>
				<h4>No books added yet, find them and add them.</h4>
				<p>
					<Link to={'/search'} className="wauto">
						Search
					</Link>
				</p>
			</div>
			<BooksOverviewPage booklist={booklist} books={quotedbooks} page={currentPage} />
		</>
	)
}
export default QuotedPage
