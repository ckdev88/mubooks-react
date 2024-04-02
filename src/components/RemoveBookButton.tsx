import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'

const RemoveBookFromSaved = (id: number) => {
	let myBooks = JSON.parse(localStorage.getItem('MyBooks'))
	myBooks = myBooks.filter((presentbook: Book) => presentbook.id !== id)
	const myBooksNew: string = JSON.stringify(myBooks)
	UpdateMyBooks(myBooksNew) // update localstorage, database, state with saved booklist
	return myBooksNew
}

const RemoveBookButton = ({ id }: IdObject) => { // TODO: improve type
	const { setUserMyBooks } = useContext(AppContext)
	function RemoveBookButtonAct() {
		const newArr = RemoveBookFromSaved(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}
	return (
		<a onClick={() => RemoveBookButtonAct()}> <span className="icon icon-remove"></span>Remove from my books </a>
	)
}
export default RemoveBookButton
