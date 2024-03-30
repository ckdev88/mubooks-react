type Author = string
interface Authors {
	author: Author
}
interface Book {
	id: number
	authors: Authors[]
	cover?: string
	date_published: string
	image?: string
	language: string
	pages: number
	saved?: boolean
	title: string
	title_short: string
}
export default function removeBookFromSaved(id: number) {
	let myBooks = JSON.parse(localStorage.getItem('MyBooks'))
	myBooks = myBooks.filter((presentbook: Book) => presentbook.id !== id)
	localStorage.setItem('MyBooks', JSON.stringify(myBooks))
}
