// FIXME sometimes flashes 1 quote before showing the other, definitive one
import { useContext, useState, useEffect } from "react"
import { AppContext } from "../App"

interface BookToQuote {
    review_fav_quote?: string
    review_fav_quote2?: string
    author_name?: string[]
    title?: string
}

interface BookQuote {
    title: string
    quote: string
    authors: string
}

const MIN_QUOTE_LENGTH = 4

function QuoteCard() {
    const { userMyBooks } = useContext(AppContext)
    const [quote, setQuote] = useState<BookQuote | null>(null)

    useEffect(() => {
        // Filter books with valid quotes
        const validBooks = userMyBooks.filter((book: BookToQuote) => {
            const hasValidQuote1 =
                book.review_fav_quote && book.review_fav_quote.length > MIN_QUOTE_LENGTH
            const hasValidQuote2 = book.review_fav_quote2 && book.review_fav_quote2.length > 0
            return (
                (hasValidQuote1 || hasValidQuote2) &&
                book.author_name &&
                book.author_name.length > 0 &&
                book.title
            )
        })

        if (validBooks.length === 0) {
            setQuote(null)
            return
        }

        // Select random book
        const randomBook = validBooks[Math.floor(Math.random() * validBooks.length)]

        // Determine which quote to use
        let chosenQuote = ""
        if (randomBook.review_fav_quote2 && Math.random() > 0.5) {
            chosenQuote = randomBook.review_fav_quote2
        } else if (randomBook.review_fav_quote) {
            chosenQuote = randomBook.review_fav_quote
        }

        // Type-safe construction of quote object
        setQuote({
            title: randomBook.title || "Unknown Title",
            quote: chosenQuote,
            authors: randomBook.author_name?.join(", ") || "Unknown Author",
        })
    }, [userMyBooks])

    if (!quote?.quote) return null // Only render if we have an actual quote

    return (
        <article className="quote shade-light dashboard-quote">
            <main>“{quote.quote}”</main>
            <footer>
                {quote.title}, {quote.authors}
            </footer>
        </article>
    )
}

export default QuoteCard
