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
	title: string
	title_short: string
}
interface Booklist {
	book: Book
}

export default function addBookToSaved(book: Book): void {
	if (book.title.length > 35) {
		book.title_short = book.title.slice(0, 35) + '...'
	} else book.title_short = book.title
	let myBooks: Books = JSON.parse(localStorage.getItem('MyBooks'))
	
	if (!myBooks) myBooks = []

	if(myBooks.filter(presentbook=>presentbook.id===book.id).length>0)return // keep unique
	
	myBooks.push({
		id: book.id,
		authors: book.authors,
		cover: book.cover,
		date_published: book.date_published,
		image: 'https://images.isbndb.com/covers' + book.image,
		language: book.language,
		pages: book.pages,
		saved: true,
		title: book.title,
		title_short: book.title_short,
	})

	// stringify array into localstorage
	localStorage.setItem('MyBooks', JSON.stringify(myBooks))
	const booklist_end = JSON.parse(localStorage.getItem('MyBooks'))
	console.log(booklist_end)
}
