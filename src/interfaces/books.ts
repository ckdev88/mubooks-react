interface AppContextType {
	username: string
	setUsername(username: string): void
	usermail: string
	setUsermail(usermail: string): void
	userMyBooks: string
	setUserMyBooks(userMyBooks: string): void
	userIsLoggedIn: boolean
	setUserIsLoggedIn(userIsLoggedIn: boolean): void
	userTest: string
	setUserTest(userTest: string): void
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
		id?: number
		index?: number
		title: string
		authors: [string]
		pages: number
		date_published: number
		image?: string
		language: string
		title_short?: string
		cover?: string
	},
]

interface Book {
	index?: number
	id: number
	authors: [string]
	cover?: string
	date_published: string
	image?: string
	language: string
	pages: number
	saved?: boolean
	wishlist?: boolean
	title: string
	title_short: string
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
	id: number
}
interface SavedObject {
	saved: boolean
}
