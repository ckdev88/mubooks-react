import { useContext } from 'react'
import BookSummary from '../../components/BookSummary'
import { AppContext } from '../../App'
const BooksOverviewPage = ({ books, page }: { books: Books; page: string }) => {
	const { userMyBooks } = useContext(AppContext)

	// TODO: build further on new feature; highlight saved books in search view
	const savedArr: Books = userMyBooks

	return books.map((book) => {
		if (page === 'searchpage') {
			savedArr.find((savedbook) => {
				if (savedbook.id === book.id) {
					book.list = savedbook.list
				}
			})
		}
		return <BookSummary book={book} key={book.id} page={page}/>
	})
}
export default BooksOverviewPage
