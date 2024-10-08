import { useEffect, useState } from 'react'
const useGetSynopsis = (
	book_id: Book['id'],
	book_cover_edition_key: Book['cover_edition_key'],
	synopsisPages: string[],
	currentPage: string
): string => {
	const [synopsis, setSynopsis] = useState<string>('')

	useEffect(
		() => {
			const fetchSynopsis = async (book_id: string): Promise<void> => {
				const fetchSynopsisPromise = fetch('https://openlibrary.org/works/' + book_id + '.json')
				fetchSynopsisPromise
					.then((response) => {
						if (!response.ok) throw new Error(`Error ${response.status}`)
						return response.json()
					})
					.then((data) => {
						if (data.description && data.description.length > 2) setSynopsis(data.description)
						else if (data.description?.value !== undefined && data.description?.value.length > 2)
							setSynopsis(data.description.value)
						else if (book_cover_edition_key !== undefined) fetchSynopsis2(book_cover_edition_key)
					})
			}

			const fetchSynopsis2 = async (book_id: string): Promise<void> => {
				const fetchSynopsisPromise = fetch('https://openlibrary.org/books/' + book_id + '.json')
				fetchSynopsisPromise
					.then((response) => {
						if (!response.ok) throw new Error(`Error ${response.status}`)
						return response.json()
					})
					.then((data) => setSynopsis(data.description))
			}
			if (synopsisPages.includes(currentPage) === true) fetchSynopsis(book_id)
		},
		// TODO: line below should be properly fixed
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return synopsis
}
export default useGetSynopsis
