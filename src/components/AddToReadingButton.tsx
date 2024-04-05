import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'


const AddToReading = (id: number) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	for (let i = 0; i < myBooks.length; i++) {
		if (myBooks[i].id === id) myBooks[i].reading = !myBooks[i].reading
	}
	const myBooksNew: string = JSON.stringify(myBooks)

	UpdateMyBooks(myBooksNew) // update localstorage, database
	return myBooksNew // return value for update global state
}

const AddToReadingButton = (id: number) => {
	const { setUserMyBooks } = useContext(AppContext)

	function AddToReadingButtonAct() {
		const newArr = AddToReading(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}

	return (
		<a onClick={() => AddToReadingButtonAct()}>
			<span className="icon icon-reading"></span>Reading now
		</a>
	)
}
export default AddToReadingButton
