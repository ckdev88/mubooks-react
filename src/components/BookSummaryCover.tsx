import { getBookCover } from '../Helpers'

const BookSummaryCover = ({
	book_cover = '',
	book_cover_redir = '',
}: {
	book_cover: Book['cover']
	book_cover_redir: Book['cover_redir']
}) => {
	let bookCover: string
	if (book_cover_redir !== undefined && book_cover_redir !== '') bookCover = book_cover_redir
	else bookCover = getBookCover(book_cover, 'M')

	const alt = ''
	return <img src={bookCover} alt="" />
}

export default BookSummaryCover
