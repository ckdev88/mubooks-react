import { useContext, useLayoutEffect, useState } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"
import TossTossers from "../../components/TossTossers"

const pageTitle = "Removed books"
const pageTitleSub = "To permanently remove or not to permanently remove"
let pageTitleSubText = pageTitleSub
const currentPage = "tossed"
const booklist = undefined

const TossedPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)
    const [books, setBooks] = useState(userMyBooks.filter((book) => book.tossed === true))

    useLayoutEffect(() => {
        setBooks(userMyBooks.filter((book) => book.tossed === true))
    }, [userMyBooks])

    let hasbooks: boolean
    if (books.length > 0) {
        hasbooks = true
        pageTitleSubText = pageTitleSub
    } else hasbooks = false

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: GLOBALS.pageAnimationDuration,
                delay: GLOBALS.pageAnimationDelay,
            }}
            animate={{ opacity: 1 }}
        >
            <Heading text={pageTitle} icon="icon-reading.svg" sub={pageTitleSubText} />

            {hasbooks ? (
                <>
                    <TossTossers />
                    <BooksOverviewPage booklist={booklist} books={books} page={currentPage} />
                </>
            ) : (
                <p>
                    No books here.
                    <br />
                    <br />
                    <Link to="/dashboard">Back to dashboard</Link> or{" "}
                    <Link to="/wishlist">View your wishlist</Link> or{" "}
                    <Link to="/search">Search</Link> to add a book.
                    <br />
                    <br />
                </p>
            )}
        </motion.div>
    )
}
export default TossedPage
