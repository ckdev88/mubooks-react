import BooksOverviewPage from "./BooksOverviewPage"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { useContext } from "react"
import { AppContext } from "../../App"
import { motion } from "motion/react"

const pageTitle = "Finished books"
const pageTitleSub = "Done and counting"
let pageTitleSubText = pageTitleSub
const currentPage = "finished"
const booklist = 3

const FinishedPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)
    const books = userMyBooks.filter(
        (book) => (book.list === booklist || book.list === 4) && !book.tossed,
    )
    let hasbooks: boolean
    if (books.length > 0) {
        hasbooks = true
        pageTitleSubText = books.length + ". " + pageTitleSub
    } else hasbooks = false

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
            <Heading text={pageTitle} icon="icon-finished.svg" sub={pageTitleSubText} />
            {hasbooks ? (
                <BooksOverviewPage books={books} page={currentPage} booklist={booklist} />
            ) : (
                <>
                    <p>Have any favorites? Add them to your favorites from here.</p>
                    <h4>Not finished any book yet.</h4>
                    <p>
                        Are you finished with the book you're reading?
                        <br />
                        Select and mark your <Link to="/reading">currently reading book</Link> as
                        finished.
                        <br />
                        <br />
                    </p>
                </>
            )}
        </motion.div>
    )
}
export default FinishedPage
