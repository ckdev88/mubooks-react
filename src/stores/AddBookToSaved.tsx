import UpdateMyBooks from "./UpdateMyBooks"

export default function AddBookToSaved(book: Book) {
	if (book.title.length > 35) {
		book.title_short = book.title.slice(0, 35) + '...'
	} else book.title_short = book.title
	let myBooks: Books = JSON.parse(localStorage.getItem('MyBooks'))
	if (myBooks !== null && myBooks.filter((presentbook) => presentbook.id === book.id).length > 0) return // keep unique

	if (myBooks === null) myBooks = []
	myBooks.push({
		id: book.id,
		authors: book.authors,
		cover: book.cover,
		date_published: book.date_published,
		image: 'https://images.isbndb.com/covers' + book.image,
		language: book.language,
		pages: book.pages,
		saved: true,
		wishlist: false,
		title: book.title,
		title_short: book.title_short,
	})

	// update localstorage, database, TODO: state with saved booklist
	UpdateMyBooks(myBooks)
}

