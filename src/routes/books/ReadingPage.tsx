import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const pageTitle = `What I'm reading now`
const pageTitleSub = "Currently enjoying books"
const currentPage = "reading"
const booklist = 2

const ReadingPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)
    const books = userMyBooks.filter((b) => b.list === booklist && !b.tossed)
    const hasbooks: boolean = books.length > 0
    const pageTitleSubText = hasbooks ? books.length + ". " + pageTitleSub : pageTitleSub

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: GLOBALS.pageAnimationDuration,
                delay: GLOBALS.pageAnimationDelay,
            }}
        >
            <Heading text={pageTitle} icon={"icon-reading.svg"} sub={pageTitleSubText} />
            {hasbooks ? (
                <BooksOverviewPage books={books} page={currentPage} booklist={booklist} />
            ) : (
                <p>
                    Want to add a book to your reading list?
                    <br />
                    <Link to="/wishlist">View your wishlist</Link> or{" "}
                    <Link to="/search">Search</Link> to add a book.
                    <br />
                    <br />
                </p>
            )}
        </motion.div>
    )
}
export default ReadingPage
