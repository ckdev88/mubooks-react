import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"
import TossTossers from "../../components/TossTossers"

const pageTitle = "Removed books"
const pageTitleSub = "To permanently remove or not to permanently remove"
const currentPage = "tossed"

const TossedPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)

    const books = userMyBooks.filter((b) => b.tossed && b.list > 0)
    const hasbooks: boolean = books.length > 0

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
            <Heading text={pageTitle} icon="icon-reading.svg" sub={pageTitleSub} />
            {hasbooks ? (
                <>
                    <TossTossers />
                    <BooksOverviewPage
                        books={userMyBooks.filter((book) => book.tossed && book.list > 0)}
                        page={currentPage}
                    />
                </>
            ) : (
                <p>
                    No books here.
                    <br />
                    <br />
                    <Link to="/dashboard">Back to dashboard</Link> <br />
                    or <br />
                    <Link to="/wishlist">View your wishlist</Link> <br />
                    or <br />
                    <Link to="/reading">View your reading list</Link> <br />
                    or <br />
                    <Link to="/finished">View your finished list</Link> <br />
                    or <br />
                    <Link to="/search">Search</Link> to add a book.
                    <br />
                    <br />
                </p>
            )}
        </motion.div>
    )
}
export default TossedPage
