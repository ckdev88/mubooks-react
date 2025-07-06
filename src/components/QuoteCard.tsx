import { useState, useEffect } from "react"
import getRandomQuote from "../utils/getRandomQuote"

function QuoteCard({ booksToQuote }: { booksToQuote: Books }) {
    if (booksToQuote === undefined) return <></>

    const [quote, setQuote] = useState<BookQuote | null>(null)
    if (booksToQuote !== undefined) {
        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
            if (quote === null) {
                const chosenQuote = getRandomQuote(booksToQuote)
                setQuote(chosenQuote)
            }
        }, [booksToQuote])

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
}

export default QuoteCard
