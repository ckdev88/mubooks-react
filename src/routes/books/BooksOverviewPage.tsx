import BookSummary from '../../components/BookSummary'
const BooksOverviewPage = ({ books }: BooksObject) => {
	const savedArr = JSON.parse(localStorage.getItem('MyBooks'))

	return books.map((book) => {
		const savedbookCheck = savedArr.filter(savedbook => savedbook.id === book.id)
		if (savedbookCheck.length > 0) book.saved = true
		else book.saved = false

		return <BookSummary book={book} key={book.id} />
	})
}
export default BooksOverviewPage
