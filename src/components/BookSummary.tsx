// TODO: add limit: started date is always before finished date
import { getBookCover } from '../Helpers'
import { useState } from 'react'
import AddBookToXButton from './AddBookToXButton'
import BookAuthorList from './BookAuthorList'
import BookStartedFinished from './BookStartedFinished'
import ReactMarkdown from 'react-markdown'
import RemoveBookFromXButton from './RemoveBookFromXButton'
import ReviewRating from './ReviewRating'
import ReviewText from './ReviewText'
import ReviewTropes from './ReviewTropes'
import ReviewQuote from './ReviewQuote'

const BookSummary = ({ book, page }: { book: Book; page: string }) => {
	const [synopsis, setSynopsis] = useState<string>('')
	const [isShowingSynopsis, setIsShowingSynopsis] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function toggleSynopsis() {
		if (isShowingSynopsis) setIsShowingSynopsis(!isShowingSynopsis)
		else {
			setIsLoading(true)
			await fetch('https://openlibrary.org/works/' + book.id + '.json')
				.then((res) => res.json())
				.then((json) => json.description?.value)
				.then((synopsis) => {
					setIsShowingSynopsis(true)
					if (synopsis !== undefined) setSynopsis(synopsis)
					else setSynopsis('No synopsis available yet.')
				})
				.catch((err) => {
					setSynopsis('No synopsis available yet.')
					console.log('error', err)
				})
				.finally(() => setIsLoading(false))
		}
	}

	return (
		// TODO: add className for when marked as saved in search results
		<article className="book-summary">
			<aside className="cover">
				<img
					src={
						getBookCover(book.cover, 'M') !== undefined
							? getBookCover(book.cover, 'M')
							: 'img/coverless.png'
					}
					alt=""
				/>
			</aside>
			<div className="article-main">
				<header>
					<h2>
						{book.title_short} <sup>({book.first_publish_year})</sup>
						<sub>{BookAuthorList(book)}</sub>
					</h2>
					{page === 'quotedbookspage' && ReviewQuote(book, book.review_fav_quote)}
					<p className="pt0 mt0">
						{book.number_of_pages_median &&
							page !== 'finishedpage' &&
							page !== 'favoritespage' &&
							page !== 'quotedbookspage' && <>{book.number_of_pages_median} pages</>}
					</p>
				</header>
				<main>
					<div className="reviews">
						{(page === 'finishedpage' || page === 'favoritespage') &&
							book.review_tropes &&
							ReviewTropes(book, book?.review_tropes)}
						{(page === 'finishedpage' || page === 'favoritespage') && ReviewRating(book)}
					</div>
					{book.list > 1 && page !== 'searchpage' && page !== 'quotedbookspage' && (
						<BookStartedFinished
							date_started={book.date_reading}
							date_finished={book.date_finished}
							bookid={book.id}
							list={book.list}
						/>
					)}
					{page !== 'quotedbookspage' && (
						<div className="marks">
							{/* TODO: build further on new feature; highlight saved books in search view */}
							{!book.list && AddBookToXButton(book, 1)}
							{(book.list === 1 || (page === 'searchpage' && book.list < 2)) && AddBookToXButton(book, 2)}
							{(book.list === 2 || (page === 'searchpage' && book.list !== 3 && book.list !== 4)) &&
								AddBookToXButton(book, 3)}
							{(book.list === 3 || (page === 'searchpage' && book.list !== 4)) &&
								AddBookToXButton(book, 4)}
							{book.list === 1 && RemoveBookFromXButton(book, 1)}
							{book.list === 2 && RemoveBookFromXButton(book, 2)}
							{book.list === 3 && RemoveBookFromXButton(book, 3)}
							{book.list === 4 && RemoveBookFromXButton(book, 4)}
						</div>
					)}
				</main>
			</div>
			<footer>
				{(page === 'finishedpage' || page === 'favoritespage') && ReviewText(book, book.review_text)}
				{(page === 'finishedpage' || page === 'favoritespage') && ReviewQuote(book, book.review_fav_quote)}
				{page !== 'finishedpage' && page !== 'favoritespage' && page !== 'quotedbookspage' && (
					<>
						<button
							className={
								isShowingSynopsis ? 'btn-text caret-right-toggle active' : 'btn-text caret-right-toggle'
							}
							onClick={toggleSynopsis}
						>
							{isLoading && 'Loading...'}
							{!isLoading && !isShowingSynopsis && 'Synopsis'}
							{!isLoading && isShowingSynopsis && <b style={{ color: 'black' }}> Synopsis </b>}
						</button>
						<div className="synopsisWrapper" aria-expanded={isShowingSynopsis}>
							<div className="synopsis">
								<ReactMarkdown>{synopsis}</ReactMarkdown>
							</div>
						</div>
					</>
				)}
				<hr />
			</footer>
		</article>
	)
}
export default BookSummary
