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
type Books = [Book]

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
