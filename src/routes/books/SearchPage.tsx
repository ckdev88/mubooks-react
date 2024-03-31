import { useRef, useState } from 'react'
import bookData from '../../../data/books.json'
import BookSummary from '../../components/BookSummary'

const SearchPage = () => {
	const boeken: BookData = bookData
	const searchForm = useRef(null)
	// TODO: ENTER on input field must properly submit, like button does

	const [resultsWarning, setResultsWarning] = useState<string>('')
	const [resultsMessage, setResultsMessage] = useState<string>('')
	const [resultCount, setResultCount] = useState<number>(0)

	const [results, setResults] = useState<Books>([])

	const [searchTerm, setSearchTerm] = useState('')

	function refreshResults(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData: HTMLFormElement = new FormData(searchForm.current)
		const searchTermToShow: string | undefined = formData.get('search_term')?.toString().trim() // TODO: rename
		// variable into something better/concise

		if (searchTermToShow !== undefined) {
			if (searchTermToShow.length < 4) {
				setResultsWarning('keep typing...')
				return
			} else {
				console.log('start new search')
				setSearchTerm(searchTermToShow)
				console.log('searchterm:', searchTerm, ' - searchTermToShow:', searchTermToShow)
				setResultsWarning('')
			}
		}

		// const totalBooks = boeken.reduce((a, obj) => a + Object.keys(obj).length, 0)
		// console.log('totalbooks:', totalBooks) // 934.236
		// console.log('length:', boeken.length) // 155.706 - lijkt overeen te komen met for-loop
		// TODO: run proper test for above

		let count = 0
		let booksToAdd = []
		for (let i = 0; i < boeken.length; i++) {
			if (searchTermToShow === boeken[i].title.toLowerCase()) {
				// TODO: marker isSaved to highlight saved books in results
				booksToAdd[count] = boeken[i]
				booksToAdd[count].id = i

				if (boeken[i].title.length > 35) {
					booksToAdd[i].title_short = boeken[i].title.slice(0, 35)
					booksToAdd[count].title_short += '...'
				} else booksToAdd[count].title_short = boeken[i].title
				if (boeken[i].image !== null)
					booksToAdd[count].cover = 'https://images.isbndb.com/covers' + boeken[i].image
				count++
			}
		}

		// search loop less exact match
		for (let i = 0; i < boeken.length; i++) {
			if (count > 30) break
			if (
				boeken[i].title.toLowerCase().includes(String(searchTermToShow)) &&
				boeken[i].title.toLowerCase() !== searchTermToShow
			) {
				// TODO: search could use some algorithmic tweaking
				// TODO: marker isSaved to highlight saved books in results
				booksToAdd[count] = boeken[i]
				booksToAdd[count].id = i
				if (boeken[i].title.length > 35) {
					booksToAdd[count].title_short = boeken[i].title.slice(0, 35)
					booksToAdd[count].title_short += '...'
				} else booksToAdd[count].title_short = boeken[i].title
				if (boeken[i].image !== null)
					booksToAdd[count].cover = 'https://images.isbndb.com/covers' + boeken[i].image
				count++
			}
		}
		if (count > 30) { setResultsMessage('Showing only 30 results. Specify a bit more.') } else setResultsMessage('')
		setResults(booksToAdd)
		setResultCount(count)
	}

	const showResults = (resultsWarning === '' ? results.map((book) => { return (BookSummary(book)) }) : '')

	return (
		<>
			<h1>Search</h1>
			<p>
				Find the book you want to add by title. <br />
				At this moment only books released after 2019 are available.
			</p>
			<form onSubmit={refreshResults} ref={searchForm}>
				<input type="text" name="search_term" id="search_term" />
				<button>Search</button>
			</form>
			<div>
				<div className={resultsWarning !== '' ? 'dblock' : 'dnone'}>{resultsWarning}</div>
				<div className={resultCount === 0 && resultsWarning === '' ? 'dblock' : 'dnone'}>
					No results found
				</div>

				<div className={resultCount > 0 && resultsWarning === '' ? 'dblock' : 'dnone'}>
					<h2 className="resultsfound">
						{resultCount > 30 ? 'Over 30' : resultCount} {resultCount > 1 ? 'books' : 'book'} found for <em>"{searchTerm}"</em>
						<sub className={resultsMessage !== '' ? 'dblock' : 'dnone'}>
							{resultsMessage}
						</sub>
					</h2>
					{showResults}
				</div>
			</div>
		</>
	)
}
export default SearchPage
