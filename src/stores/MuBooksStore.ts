import { useState } from 'react'

type Author = string
interface Authors {
	author: Author
}
interface Book {
	id: number
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
//const [bookList, setBookList] = useState(null)

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

// export { addMyBook }
