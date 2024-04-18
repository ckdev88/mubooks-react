import { useContext } from 'react'
import { AppContext } from '../App'
import { MyBooksUpdate } from '../helpers/MyBooksHelpers'

// TODO: this could just be a toggle with addtowishlist... its basically the same code

const RemoveBookFromWishlist = (id: Id) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	for (let i = 0; i < myBooks.length; i++) {
		if (myBooks[i].id === id) myBooks[i].wishlist = !myBooks[i].wishlist
	}
	const myBooksNew: string = JSON.stringify(myBooks)

	MyBooksUpdate(myBooksNew) // update localstorage, database
	return myBooksNew // return value for update global state
}

const RemoveFromWishlistButton = (id: Id, wishlist: boolean) => {
	const { setUserMyBooks } = useContext(AppContext)

	function RemoveFromWishlistButtonAct() {
		const newArr = RemoveBookFromWishlist(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}

	if (!wishlist) return <></>
	return (
		<div className="mark">
			<a onClick={() => RemoveFromWishlistButtonAct()}>
				<span className="icon icon-remove"></span>Remove from wishlist
			</a>
		</div>
	)
}
export default RemoveFromWishlistButton
