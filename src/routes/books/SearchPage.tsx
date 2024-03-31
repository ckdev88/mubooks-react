import { useRef, useState } from 'react'
import bookData from '../../../data/books.json'
import addBookToSaved from '../../stores/addBookToSaved'
import removeBookFromSaved from '../../stores/removeBookFromSaved'

type Author = string
interface Authors {
	author: Author
}
interface Book {
	id: number
	authors: [Authors]
	cover?: string
	date_published: string
	image?: string
	language: string
	pages: number
	saved?: boolean
	title?: string
	title_short: string
}
interface Results {
	result: Book
}

const SearchPage = () => {
	const boeken = bookData
	const searchForm = useRef(null)
	// TODO: ENTER on input field must properly submit, like button does

	const [resultsWarning, setResultsWarning] = useState<string>('')
	const [resultCount, setResultCount] = useState<number>(0)

	const [results, setResults] = useState<Results>([])

	const [searchTerm, setSearchTerm] = useState('')

	function refreshResults(event) {
		event.preventDefault()
		let formData = new FormData(searchForm.current)
		const searchTermToShow = formData.get('search_term')?.toString().trim()
		
		if (searchTermToShow !== undefined) {
			if (searchTermToShow.length < 4) {
				setResultsWarning('keep typing...')
				return
			} else {
				console.log('start new search')
				setSearchTerm(searchTermToShow)
				console.log('searchterm:',searchTerm,' - searchTermToShow:',searchTermToShow)
				setResultsWarning('')
			}
		}

		let count = 0

		const totalBooks = boeken.reduce((a, obj) => a + Object.keys(obj).length, 0)
		// console.log('totalbooks:', totalBooks) // 934.236
		// console.log('length:', boeken.length) // 155.706 - lijkt overeen te komen met for-loop
		// TODO: run proper test for above
		let bookToAdd = []
		for (let i = 0; i < boeken.length; i++) {
			if (searchTermToShow === boeken[i].title.toLowerCase()) {
				// TODO: marker isSaved to highlight saved books in results
				bookToAdd[count] = boeken[i]
				bookToAdd[count].id = i

				if (boeken[i].title.length > 35) {
					bookToAdd[i].title_short = boeken[i].title.slice(0, 35)
					bookToAdd[count].title_short += '...'
				} else bookToAdd[count].title_short = boeken[i].title
				if (boeken[i].image !== null)
					bookToAdd[count].cover = 'https://images.isbndb.com/covers' + boeken[i].image
				count++
			}
		}

		// search loop less exact match
		for (let i = 0; i < boeken.length; i++) {
			if (count > 30) {
				setResultsWarning('too many results')
				break
			}
			if (boeken[i].title.toLowerCase().includes(searchTermToShow) && boeken[i].title.toLowerCase() !== searchTermToShow) {
				// TODO: marker isSaved to highlight saved books in results
				bookToAdd[count] = boeken[i]
				bookToAdd[count].id = i
				if (boeken[i].title.length > 35) {
					bookToAdd[count].title_short = boeken[i].title.slice(0, 35)
					bookToAdd[count].title_short += '...'
				} else bookToAdd[count].title_short = boeken[i].title
				if (boeken[i].image !== null)
					bookToAdd[count].cover = 'https://images.isbndb.com/covers' + boeken[i].image
				count++
			}
		}
		setResults(bookToAdd)
		setResultCount(count)
	}

	function showResults() {
		if (resultsWarning === '') {
			return results.map((result: Book) => {
				// TODO: add className for when marked as saved
				return (
					<article className="book-summary" key={result.id}>
						<header>
							<aside className="cover">
								<img src={result.cover} alt="" />
							</aside>
							<div className="in-short">
								<h2>
									{result.title_short}
									<sub>
										{result.authors.map((author: Author, index: number) => {
											return <div key={index}>{author}</div>
										})}
									</sub>
								</h2>
								{result.date_published}
								<br />
								{result.pages} pages
								<br />
							</div>
						</header>
						<footer>
							<div className="marks">
								<div className="mark">
									<a onClick={() => addBookToSaved(result)}>
										<span className="icon icon-add"></span>Save in my books
									</a>
									<br />
									<a onClick={() => removeBookFromSaved(result.id)}>
										<span className="icon icon-remove"></span>Remove from my books
									</a>
								</div>
							</div>
							<hr />
						</footer>
					</article>
				)
			})
		}
	}
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
				<div className={resultCount > 0 && resultsWarning === '' ? 'dblock' : 'dnone'}>
					<h2 className="resultsfound">
						{resultCount} books found for <em>"{searchTerm}"</em>
					</h2>
					{showResults()}
				</div>
			</div>
		</>
	)
}
export default SearchPage
