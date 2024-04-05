import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'


const AddBookToWishlist = (id: number) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	for (let i = 0; i < myBooks.length; i++) {
		if (myBooks[i].id === id) myBooks[i].wishlist = !myBooks[i].wishlist
	}
	const myBooksNew: string = JSON.stringify(myBooks)

	UpdateMyBooks(myBooksNew) // update localstorage, database
	return myBooksNew // return value for update global state
}

const AddToWishlistButton = (id: number) => {
	const { setUserMyBooks } = useContext(AppContext)

	function AddToWishlistButtonAct() {
		const newArr = AddBookToWishlist(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}

	return (
		<a onClick={() => AddToWishlistButtonAct()}>
			<span className="icon icon-wishlist"></span>Add to wishlist
		</a>
	)
}
export default AddToWishlistButton
