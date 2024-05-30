import { useContext, useEffect } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const WishlistPage = () => {
	const { userMyBooks, setNavTitle } = useContext(AppContext)
	const pageTitle = 'Mu Wishlist'
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	let hasbooks = false
	let booksFiltered: Books = []

	if (localStorage.getItem('MyBooks') !== 'undefined') {
		booksFiltered = userMyBooks.filter((book: Book) => book.list === 1)
		if (booksFiltered !== undefined) {
			if (booksFiltered.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>
				{pageTitle}
				<sub>All the books I will read read soon: {booksFiltered.length}</sub>
			</h1>
			<h4 className={hasbooks === true ? 'dnone' : 'dblock'}>No books on mu wishlist yet.</h4>
			<p>
				Want to add a book to your wishlist?
				<br />
				<Link to="/search">Search</Link> or <Link to="/add-book">Add a book yourself</Link>.<br />
				<br />
			</p>
			<BooksOverviewPage books={booksFiltered} page="wishlistpage" />
		</>
	)
}
export default WishlistPage
