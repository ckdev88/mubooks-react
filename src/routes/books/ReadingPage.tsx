import { useContext } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'
import Heading from '../../components/ui/Heading'

const pageTitle = `What I'm reading now`
const currentPage = 'reading'
const booklist = 2

const ReadingPage = () => {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks: boolean = false
	if (userMyBooks.filter((book) => book.list === booklist).length > 0) hasbooks = true
	const books = userMyBooks.filter((book) => book.list === booklist)

	return (
		<>
			<Heading text={pageTitle} icon={'icon-reading.svg'} sub="Currently enjoying books" />
			{!hasbooks && (
				<>
					<p>
						Want to add a book to your reading list?
						<br />
						<Link to="/wishlist">View your wishlist</Link> or <Link to="/search">Search</Link> to add a book.
						<br />
						<br />
					</p>
				</>
			)}
			<BooksOverviewPage books={books} page={currentPage} booklist={booklist} />
		</>
	)
}
export default ReadingPage
