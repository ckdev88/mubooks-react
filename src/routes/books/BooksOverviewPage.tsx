import { useContext } from 'react'
import BookSummary from '../../components/BookSummary'
import { AppContext } from '../../App'
import BooksOverviewFilterSort from '../../components/BooksOverviewFilterSort'

const BooksOverviewPage = ({ books, page }: { books: Books; page: Page }) => {
	const { userMyBooks } = useContext(AppContext)
	const savedArr: Books = userMyBooks
	const fsPages: Page[] = ['wishlist', 'finished', 'favorites', 'savedbooks']

	return (
		<>
			{fsPages.includes(page) && <BooksOverviewFilterSort />}
			{books.map((book) => {
				if (page === 'search') {  
					savedArr.find((savedbook) => {
						if (savedbook.id === book.id) {
							book.list = savedbook.list
							book.date_reading = savedbook.date_reading
							book.date_finished = savedbook.date_finished
						}
					})
				}
				return <BookSummary book={book} key={`BookSummary${book.id}`} currentPage={page} />
			})}
		</>
	)
}
export default BooksOverviewPage
