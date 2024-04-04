import { useContext } from 'react'
import BookSummary from '../../components/BookSummary'
import { AppContext } from '../../App'
const BooksOverviewPage = ({ books }: BooksObject, page: string) => {
	const { userMyBooks } = useContext(AppContext)
	let savedArr: Books
	if (page === 'savedbookspage' || page === 'wishlistpage') savedArr = books // TODO: actually might be better to turn
	// conditionals around, since saved books (reading/finished/wishlist) will always be saved,
	// whereas search results are mostly not
	else savedArr = JSON.parse(localStorage.getItem('MyBooks'))

	// coming from raw data, crosscheck per book with state/localstorage saved/wishlist
	return books.map((book) => {
		if (page !== 'savedbookspage') { // TODO: see comment above

			const savedbookCheck = savedArr.filter(savedbook => savedbook.id === book.id)
			if (savedbookCheck.length > 0) book.saved = true
			else book.saved = false

			const wishlistCheck = JSON.parse(userMyBooks).filter(stateBook => stateBook.id === book.id && stateBook.wishlist === true)
			if (wishlistCheck.length > 0) book.wishlist = true
			else book.wishlist = false

			const readingCheck = JSON.parse(userMyBooks).filter(stateBook => stateBook.id === book.id && stateBook.reading === true)
			if (readingCheck.length > 0) book.reading = true
			else book.reading = false

		}
		return <BookSummary book={book} key={book.id} />
	})
}
export default BooksOverviewPage
