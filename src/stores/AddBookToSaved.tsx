import UpdateMyBooks from "./UpdateMyBooks"

export default function AddBookToSaved(book: Book) {
	if (book.title.length > 35) {
		book.title_short = book.title.slice(0, 35) + '...'
	} else book.title_short = book.title
	let myBooks: Books = JSON.parse(localStorage.getItem('MyBooks') as string)
	if (myBooks !== null && myBooks.filter((presentbook) => presentbook.id === book.id).length > 0) return // keep unique

	if (myBooks === null) myBooks = []
	myBooks.push({
		id: book.id,
		authors: book.authors,
		cover: book.cover,
		date_published: book.date_published,
		image: book.image,
		language: book.language,
		pages: book.pages,
		saved: true,
		wishlist: book.wishlist,
		title: book.title,
		title_short: book.title_short,
	})

	UpdateMyBooks(JSON.stringify(myBooks))
}

