import { useRef } from 'react'

const SearchPage = () => {
	const searchForm = useRef(null)

	function refreshResults(e): void {
		e.preventDefault()
		let formData = new FormData(searchForm.current)
		const search_term = formData.get('search_term')
		console.log(search_term)
	}

	return (
		<>
			<h1>Search</h1>
			<p>
				Find the book you want to add by title. <br />
				At this moment only books released after 2019 are available.
			</p>
			<form onSubmit={refreshResults} ref={searchForm}>
				<input type="text" name="search_term" />
				<button type="submit" value="submit">
					Search
				</button>
			</form>
		</>
	)
}
export default SearchPage
