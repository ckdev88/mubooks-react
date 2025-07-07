import { useContext, useMemo } from "react"
import QuoteCard from "../../components/QuoteCard"
import DashboardDeck from "../../components/dashboard/DashboardDeck"
import { motion } from "motion/react"
import { AppContext } from "../../App"

export default function DashboardPage() {
    const { userMyBooks, darkTheme } = useContext(AppContext)

    // Memoize the filtered books to avoid recalculating on every render
    const booksNotTossed: Books | undefined = useMemo(() => {
        if (userMyBooks !== undefined) return userMyBooks.filter((book) => !book.tossed) ?? []
    }, [userMyBooks])

    const iconSuffix = darkTheme ? "-white" : ""

    // OPTIMIZE: could use memoization
    let deck: DeckArray | undefined = undefined
    deck = {
        reading: {
            books: booksNotTossed?.filter((book) => book.list === 2),
            btnIconAdd: "img/plus-icon.svg",
            icon: "icon-reading.svg",
            noBooksText: "Already reading a book? Let's add it here.",
            page: "reading",
            title: "What I'm reading now",
        },
        wishlist: {
            books: booksNotTossed?.filter((book) => book.list === 1),
            btnIconAdd: `img/icon-wishlist${iconSuffix}.png`,
            icon: "icon-wishlist.svg",
            noBooksText: "Next in line.",
            page: "wishlist",
            title: "Mu Wishlist",
        },
        favourites: {
            books: booksNotTossed?.filter((book) => book.list === 4),
            btnIconAdd: `img/icon-favourites${iconSuffix}.png`,
            icon: "icon-favourites.svg",
            noBooksText: "Only the best ones here",
            page: "favourites",
            title: "Mu Favourites",
        },
        finished: {
            books: booksNotTossed?.filter((book) => book.list === 3),
            btnIconAdd: `img/icon-finished${iconSuffix}.png`,
            icon: "icon-finished.svg",
            noBooksText: "Only the best ones here",
            page: "finished",
            title: "Mu Finished books",
        },
        savedbooks: {
            books: booksNotTossed?.filter((book) => book.list > 0),
            btnIconAdd: "img/save-books-icon.png",
            icon: "savedbooks.svg",
            noBooksText: "Let&lsquo;s start saving books.",
            page: "savedbooks",
            title: "All of Mu Books",
        },
    }

    if (deck !== undefined)
        return (
            <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                animate={{ opacity: 1, transition: { duration: 2 } }}
            >
                {booksNotTossed !== undefined && <QuoteCard booksToQuote={booksNotTossed} />}
                <DashboardDeck props={deck.reading} />
                <DashboardDeck props={deck.wishlist} />
                <DashboardDeck props={deck.favourites} />
                <DashboardDeck props={deck.finished} />
                <DashboardDeck props={deck.savedbooks} />
            </motion.div>
        )
}
