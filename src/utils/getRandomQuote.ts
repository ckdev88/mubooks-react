export default function getRandomQuote(books: Books | undefined): BookQuote | null {
    const MIN_QUOTE_LENGTH = 4
    if (books === undefined) return null

    const validBooks = books.filter((book: BookToQuote) => {
        const hasValidBaseData =
            book.title !== "" && book.author_name !== undefined && book.author_name.length > 0
        const hasValidQuote1 =
            book.review_fav_quote && book.review_fav_quote.length > MIN_QUOTE_LENGTH
        const hasValidQuote2 = book.review_fav_quote2 && book.review_fav_quote2.length > 0
        return (
            hasValidBaseData && (hasValidQuote1 || hasValidQuote2) && book.author_name && book.title
        )
    })

    if (validBooks.length === 0) return null

    const randomBook = validBooks[Math.floor(Math.random() * validBooks.length)]

    // Determine which quote to use
    let chosenQuote = ""
    if (randomBook.review_fav_quote2 && Math.random() > 0.5)
        chosenQuote = randomBook.review_fav_quote2
    else if (randomBook.review_fav_quote) chosenQuote = randomBook.review_fav_quote

    const quote = {
        title: randomBook.title,
        quote: chosenQuote,
        authors: randomBook.author_name.join(", "),
    }
    return quote
}
