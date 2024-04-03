import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"

const WishlistPage = () => {
	const { userMyBooks } = useContext(AppContext)
	let hasbooks = false
	let books: Books

	if (localStorage.getItem('MyBooks') === 'undefined') books = []
	else {
		books = JSON.parse(userMyBooks)
		books = books.filter(book => book.wishlist === true)
		if (books !== undefined) {
			if (books.length > 0) hasbooks = true
			else hasbooks = false
		}
	}

	return (
		<>
			<h1>Wishlist</h1>
			<p>Books I will read read soon.</p>
			<div className={hasbooks === true ? 'dnone' : 'dblock'}>
				<h4>No books on my wishlist yet.</h4>
				<p>Select a book from Mu Books or use the search.</p>
				<button className="wauto mr1">Mu Books</button>
				<button className="wauto">Search</button>
			</div>
			<BooksOverviewPage books={books} page="wishlistpage" />
		</>
	)
}
export default WishlistPage
