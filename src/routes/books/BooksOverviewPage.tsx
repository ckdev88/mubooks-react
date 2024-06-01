import { useContext } from 'react'
import BookSummary from '../../components/BookSummary'
import { AppContext } from '../../App'
const BooksOverviewPage = ({ books, page }: { books: Books; page: string }) => {
	const { userMyBooks } = useContext(AppContext)
	const savedArr: Books = userMyBooks

	return books.map((book) => {
		if (page === 'searchpage') {
			savedArr.find((savedbook) => {
				if (savedbook.id === book.id) {
					book.list = savedbook.list
					book.date_reading = savedbook.date_reading
					book.date_finished = savedbook.date_finished
				}
			})
		}
		return <BookSummary book={book} key={book.id} page={page} />
	})
}
export default BooksOverviewPage
