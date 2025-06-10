import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const pageTitle = "Removed books"
const pageTitleSub = "To permanently remove or not to permanently remove"
let pageTitleSubText = pageTitleSub
const currentPage = "tossed"
const booklist = undefined

const TossedPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)
    let hasbooks = false
    const books = userMyBooks.filter((book) => book.tossed === true)
    console.log("SADFSADF books:", books)
    if (books.length > 0) {
        hasbooks = true
        pageTitleSubText = books.length + ". " + pageTitleSub
    }

    console.log("currentPage:", currentPage)
    console.log("booklist:", booklist)

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
            <Heading text={pageTitle} icon={"icon-reading.svg"} sub={pageTitleSubText} />
            {!hasbooks && (
                <p>
                    No books here.
                    <br />
                    <Link to="/dashboard">Back to dashboard</Link> or{" "}
                    <Link to="/wishlist">View your wishlist</Link> or{" "}
                    <Link to="/search">Search</Link> to add a book.
                    <br />
                    <br />
                </p>
            )}
            <BooksOverviewPage books={books} page={currentPage} booklist={booklist} />
        </motion.div>
    )
}
export default TossedPage
