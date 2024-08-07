import { useState, useContext } from 'react'
import { cleanIndexKey } from '../helpers/cleanInput'
import { AppContext } from '../App'
import BooksOverviewPage from '../routes/books/BooksOverviewPage'

const TropesInMyBooks = ({ page }: { page: Page }) => {
	const { userMyBooks } = useContext(AppContext)
	const [activeTrope, setActiveTrope] = useState<string>('')
	const [tropeBooks, setTropeBooks] = useState<Books>([])
	const tropesSet = new Set<string>()

	userMyBooks.map((book) => {
		if (book.review_tropes) book.review_tropes.map((reviewtrope) => tropesSet.add(reviewtrope))
	})
	const tropesArr = Array.from(tropesSet)

	function showTropeBooks(trope: string) {
		const tropeBooksFiltered = userMyBooks.filter(
			(book: Book) =>
				book.review_tropes !== undefined && book.review_tropes.length > 0 && book.review_tropes.includes(trope)
		)
		setTropeBooks(tropeBooksFiltered)
		setActiveTrope(trope)
	}

	return (
		<>
			<h2>Tropes in my Books.</h2>
			<ul className="tropes clr">
				{tropesArr.map((trope, index) => (
					<li key={cleanIndexKey(trope, index)} className="trope_add">
						<button className="btn-txt btn-sm mb0" onClick={() => showTropeBooks(trope)}>
							{trope}
						</button>
					</li>
				))}
			</ul>
			{tropeBooks.length > 0 && (
				<>
					<h2>
						My Books for <em>{activeTrope}</em>
					</h2>
					<br />
					<BooksOverviewPage books={tropeBooks} page={page} />
				</>
			)}
		</>
	)
}
export default TropesInMyBooks
