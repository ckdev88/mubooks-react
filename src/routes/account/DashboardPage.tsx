import QuoteCard from "../../components/QuoteCard"
// import { localStorageKey } from '../../../utils/supabase'
// import { useNavigate } from 'react-router-dom'
import DashboardDeck from "../../components/dashboard/DashboardDeck"
import { motion } from "motion/react"
import { AppContext } from "../../App"

export default function DashboardPage() {
    const { userMyBooks, darkTheme } = useContext(AppContext)

            <DashboardDeck
                page="reading"
                title="What I&lsquo;m reading now"
                noBooksText="Already reading a book? Let's add it here."
                icon="icon-reading.svg"
            />
            <DashboardDeck
                page="wishlist"
                title="Mu Wishlist"
                noBooksText="Next in line."
                icon="icon-wishlist.svg"
            />
            <DashboardDeck
                page="favourites"
                title="Mu Favourites"
                noBooksText="Only the best ones here"
                icon="icon-favourites.svg"
            />
            <DashboardDeck
                page="finished"
                title="Mu Finished books"
                noBooksText="Only the best ones here"
                icon="icon-finished.svg"
            />
            <DashboardDeck
                page="savedbooks"
                title="All of Mu Books"
                noBooksText="Let&lsquo;s start saving books."
                icon="savedbooks.svg"
    // Memoize the filtered books to avoid recalculating on every render
    const booksNotTossed: Books | undefined = useMemo(() => {
        if (userMyBooks !== undefined) return userMyBooks.filter((book) => !book.tossed) ?? []
    }, [userMyBooks])
    if (deck !== undefined)
        return (
            <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                animate={{ opacity: 1, transition: { duration: 2 } }}
            >
                {booksNotTossed !== undefined && <QuoteCard booksToQuote={booksNotTossed} />}
            </motion.div>
        )
}
/* <Tropes /> <Stats />  */
