import { useContext } from 'react'
import { AppContext } from '../App'
import { MyBooksUpdate } from '../helpers/MyBooksHelpers'

const RemoveBookFromSaved = (id: Id) => {
	let myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)
	myBooks = myBooks.filter((presentbook: Book) => presentbook.id !== id)
	const myBooksNew: string = JSON.stringify(myBooks)
	MyBooksUpdate(myBooksNew) // update localstorage, database, state with saved booklist
	return myBooksNew
}

const RemoveBookButton = (id: Id, saved: boolean) => {
	const { setUserMyBooks } = useContext(AppContext)
	function RemoveBookButtonAct() {
		const newArr = RemoveBookFromSaved(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}
	if (!saved) return <></>
	return (
		<div className="mark">
			<button className="btn-text" onClick={() => RemoveBookButtonAct()}>
				<span className="icon icon-remove"></span>Remove from saved books
			</button>
		</div>
	)
}
export default RemoveBookButton
