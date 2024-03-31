export default function BookAuthorList(book: Book) {
	return book.authors.map((author, index: number) => {
		const key = book.id + '-' + index
		return (
			<span key={key} id={key}>
				{author}
				<br />
			</span>
		)
	})
}
