interface AppContextType {
	username: string
	setUsername(username: string): void
	usermail: string
	setUsermail(usermail: string): void
	userMyBooks: string
	setUserMyBooks(userMyBooks: string): void
	userIsLoggedIn: boolean
	setUserIsLoggedIn(userIsLoggedIn: boolean): void
}
type User = {
	email: string
	password: string
	screenname?: string
	MyBooks?: string
}
interface LoginFormInput {
	loginemail: { value: string }
	loginpassword: { value: string }
}
type BookData = [
	{
		id: Id
		isbn0: string
		isbn1: string
		index?: number
		title: string
		author_name: [string]
		number_of_pages_median: number
		first_publish_year: number
		cover_edition_key: string
		cover: string
		coverS: string
		coverM: string
		coverL: string
		img?: string
		title_short?: string
	},
]
interface Book {
	author_key: [string]
	author_name: [string]
	cover: string
	coverL: string
	coverM: string
	coverS: string
	cover_edition_key: string
	edition_key: [string]
	favorite?: boolean
	finished?: boolean
	first_publish_year: string
	id: Id
	img?: string
	index?: number
	isbn0: string
	isbn1: string
	isbn?: [string]
	number_of_pages_median: number
	reading?: boolean
	saved?: boolean
	title: string
	title_short: string
	wishlist?: boolean
}
type Results = [Book]
interface Books extends Array<Book> { }

interface BookObject {
	book: Book
}
interface BooksObject {
	books: Books
}
interface IdObject {
	id: Id
}
type Id = string
interface SavedObject {
	saved: boolean
}

interface SearchResult {
	title: string
	first_publish_year: number
	id:string
	isbn0: string
	isbn1: string
	cover_edition_key: string
	cover: string
	coverS: string
	coverM: string
	coverL: string
	author_name: [string]
}
interface SearchResults extends Array<SearchResult> { }
