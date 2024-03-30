import { useState } from 'react'

type Author = string
interface Authors {
	author: Author
}
interface Book {
	id?: number
	authors: [Authors]
	cover?: string
	date_published: string
	image?: string
	language: string
	pages: number
	saved?: boolean
	title?: string
	title_short: string
}
interface Booklist {
	book: Book
}

// const booklist_start=JSON.parse(localStorage.getItem('MyBooks'))
const [bookList, setBookList] = useState(null)


function addMyBook(book: Book): Booklist {
	// console.log(booklist_start)
	console.log('aaaaa')
	console.log('addmybook', book)
	/* if (book.title.length > 35) {
		book.title_short = book.title.slice(0, 35) + '...'
	} else book.title_short = book.title
	let myBooks: Books = JSON.parse(localStorage.getItem('MyBooks'))
	if (!myBooks) myBooks = []
	myBooks.push({
		// build object and push it in the array
		title: book.title,
		title_short: book.title_short,
		date_published: book.date_published,
		authors: book.authors,
		pages: book.pages,
		image: 'https://images.isbndb.com/covers' + book.image,
	})

	// stringify array into localstorage
	localStorage.setItem('MyBooks', JSON.stringify(myBooks))
	// ... and into this state
	setBookList(myBooks)
	return bookList // nodig? */
}

/* const getBookList = (): Booklist | boolean => {
	if (localStorage.getItem('MyBooks') === null) return false
	return bookList
} */

/* const getSavedBooks = (): Booklist | boolean => {
	// how is this different from getBookList?
	if (localStorage.getItem('MyBooks') === null) return false
	return bookList
} */

/* const saveBookToggle = (book: Book, index: number) => {
	// done from search-page
	bookList[index].saved = bookList[index].saved // TODO: cant modify like this, use state
	if (bookList[index].saved === true) addMyBook(book)
} */

export { addMyBook }
