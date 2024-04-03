import BookSummary from '../../components/BookSummary'
const BooksOverviewPage = ({ books }: BooksObject, page: string) => {
	let savedArr: Books
	if (page === 'savedbookspage') savedArr = books // TODO: actually might be better to turn
	// conditionals around, since saved books (reading/finished/wishlist) will always be saved,
	// whereas search results are mostly not
	else savedArr = JSON.parse(localStorage.getItem('MyBooks'))

	return books.map((book) => {
		if (page !== 'savedbookspage') { // TODO: see comment above
			const savedbookCheck = savedArr.filter(savedbook => savedbook.id === book.id)
			if (savedbookCheck.length > 0) book.saved = true
			else book.saved = false
		}
		return <BookSummary book={book} key={book.id} />
	})
}
export default BooksOverviewPage
