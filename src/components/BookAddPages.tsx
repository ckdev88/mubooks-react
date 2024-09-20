import { useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../../utils/supabase'
import { cleanInput } from '../helpers/cleanInput'
import { AppContext } from '../App'

import BookFetchPages from './BookFetchPages'
import BtnInsideCaret from './ui/BtnInsideCaret'

const BookAddPages = ({
	book_id,
	book_number_of_pages_median,
}: {
	book_id: Book['id']
	book_number_of_pages_median: Book['number_of_pages_median']
}) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)
	const [showForm, setShowForm] = useState(false)
	const inputid = 'addPagesToBookId' + book_id

	const [bookPages, setBookPages] = useState<number>(book_number_of_pages_median)
	const [isModding, setIsModding] = useState<boolean>(false)

	// TODO: move this function to generic helper location
	const updateMyBooksCallback = useCallback(
		async function updateMyBooks(myBooksNew: Books) {
			let msg: string
			setUserMyBooks(myBooksNew)
			const { error } = await supabase
				.from('user_entries')
				.update({ json: myBooksNew, testdata: 'updated from book summary: Add pages' })
				.eq('user_id', userid)
				.select('*')
			if (error) msg = error.message
			else msg = 'Updated pages.'
			setPopupNotification(msg)
		},
		[setPopupNotification, setUserMyBooks, userid]
	)

	const updatePagesCallback = useCallback(
		async function updatePages() {
			if (userMyBooks.length < 1) return

			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book_id) {
					if (bookPages !== userMyBooks[i].number_of_pages_median) {
						userMyBooks[i].number_of_pages_median = bookPages
					}
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
		},
		[userMyBooks, book_id, bookPages, updateMyBooksCallback]
	)

	function processPagesAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const newvalue: number = Number(cleanInput(e.currentTarget.pagesAmount.value))
		if (newvalue !== undefined && newvalue > 0) {
			setIsModding(true)
			setBookPages(newvalue)
		}
	}

	useEffect(() => {
		if (showForm) document.getElementById(inputid)?.focus()
		if (bookPages !== book_number_of_pages_median) {
			if (isModding) {
				updatePagesCallback()
				setIsModding(false)
			}
		}
	}, [showForm, bookPages, isModding, updatePagesCallback, book_number_of_pages_median, inputid])

	return (
		<>
			<button className="btn-text" onClick={() => setShowForm(!showForm)}>
				__ pages
			</button>
			{showForm ? (
				<div className={showForm ? 'dblock' : 'dnone'}>
					<BookFetchPages book_id={book_id} />
					<form onSubmit={processPagesAddForm} className="single-small-form wm6 diblock">
						<input type="number" id={inputid} name="pagesAmount" defaultValue={book_number_of_pages_median} />
						?
						<BtnInsideCaret />
					</form>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
export default BookAddPages
