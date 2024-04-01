interface AppContextType {
	username: string
	setUsername(username: string): void
	usermail: string
	setUsermail(usermail: string): void
	loginstatus: boolean
	setLoginstatus(loginstatus: boolean): void
}

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
	title: string
	title_short: string
}
type Results = [Book]
interface Books extends Array<Book>{}
 
type BookData = [{
	id?:number
	index?: number
	title: string
	authors: [string]
	pages: number
	date_published: number
	image?: string
	language: string
	title_short?:string
	cover?:string
}]
