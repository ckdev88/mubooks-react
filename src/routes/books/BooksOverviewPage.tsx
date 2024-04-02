import BookSummary from '../../components/BookSummary'
const BooksOverviewPage = ({ books }: BooksObject) => {
	return books.map((book) => {
		return <BookSummary book={book} key={book.id} />
	})
}
export default BooksOverviewPage
