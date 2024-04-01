import updateMyBooks from "./updateMyBooks"

export default function removeBookFromSaved(id: number) {
	let myBooks = JSON.parse(localStorage.getItem('MyBooks'))
	myBooks = myBooks.filter((presentbook: Book) => presentbook.id !== id)

	const myBooksNew = JSON.stringify(myBooks)
	localStorage.setItem('MyBooks', myBooksNew)

	// update database with saved booklist
	updateMyBooks(myBooksNew)
}
