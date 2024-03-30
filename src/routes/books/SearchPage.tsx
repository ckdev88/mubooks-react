import { useRef, useState } from 'react'
import bookData from '../../../data/books.json'

const SearchPage = () => {
	const boeken = bookData
	const searchForm = useRef(null)
	let searchTermToShow = useRef('')

	const [isSearched, setIsSearched] = useState<boolean>(false)
	const [resultsWarning, setResultsWarning] = useState<string>('keep typing...')
	const [resultCount, setResultCount] = useState<number>(0)

	const [currentAlert, setCurrentAlert] = useState<string>('')
	const [results, setResults] = useState<[{}]>([])

	const [searchTerm, setSearchTerm] = useState('')
	function refreshResults(event) {
		event.preventDefault()
		let formData = new FormData(searchForm.current)
		const searchTermToShow = formData.get('search_term')
		setSearchTerm(searchTermToShow.toString().trim())
		if (searchTermToShow.length < 4) {
			setResultsWarning('keep typing...')
			setIsSearched(true)
			return
		} else setResultsWarning('')

		let count = 0

		let s = searchTerm.toLowerCase()
		setResultsWarning('')
		// search loop exact match
		// console.log(boeken)

		console.log('s', '#' + s + '#')
		const totalBooks = boeken.reduce((a, obj) => a + Object.keys(obj).length, 0)
		// console.log('totalbooks:', totalBooks) // 934.236
		// console.log('length:', boeken.length) // 155.706 - lijkt overeen te komen met for-loop
		// TODO: run proper test for above
		let bookToAdd = []
		for (let i = 0; i < boeken.length; i++) {
			if (s === boeken[i].title.toLowerCase()) {
				// TODO: marker isSaved to highlight saved books in results
				bookToAdd[count] = boeken[i]

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
			if (boeken[i].title.toLowerCase().includes(s) && boeken[i].title.toLowerCase() !== s) {
				// TODO: marker isSaved to highlight saved books in results
				bookToAdd[count] = boeken[i]
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
		setIsSearched(true)
		setResultCount(count)
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
			<div id="alert" className={currentAlert !== '' ? 'dblock' : 'dnone'}>
				<div>{currentAlert}</div>
			</div>
			<div>
				<div className={resultsWarning !== '' ? 'dblock' : 'dnone'}>{resultsWarning}</div>
				<div className={resultCount > 0 ? 'dblock' : 'dnone'}>
					<h2 className="resultsfound">
						{resultCount} books found for <em>"{searchTerm}"</em>
					</h2>
					{results.map((result) => {
						return <div key={result.id}>{result.title_short}</div>
					})}
				</div>
			</div>
		</>
	)
}
export default SearchPage
