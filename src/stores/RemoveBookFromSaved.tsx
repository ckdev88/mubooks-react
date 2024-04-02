import UpdateMyBooks from "./UpdateMyBooks"
export default function RemoveBookFromSaved(id: number) {
	let myBooks = JSON.parse(localStorage.getItem('MyBooks'))
	console.log(myBooks)
	myBooks = myBooks.filter((presentbook: Book) => presentbook.id !== id)

	const myBooksNew: string = JSON.stringify(myBooks)
	// update localstorage, database, state with saved booklist
	UpdateMyBooks(myBooksNew)
}
