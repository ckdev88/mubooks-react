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
    let hasbooks = false

    const arrLength = userMyBooks.filter(
        (book) => book.list === booklist || book.list === 4,
    ).length

    if (arrLength > 0) {
        hasbooks = true // OPTIMIZE this is a bit meh
        pageTitleSubText = arrLength + ". " + pageTitleSub
    }

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
            <Heading text={pageTitle} icon="icon-finished.svg" sub={pageTitleSubText} />
            {!hasbooks && (
                <>
                    <p>Have any favorites? Add them to your favorites from here.</p>
                    <h4>Not finished any book yet.</h4>
                    <p>
                        Are you finished with the book you're reading?
                        <br />
                        Select and mark your{" "}
                        <Link to="/reading">currently reading book</Link> as finished.
                        <br />
                        <br />
                    </p>
                </>
            )}
            <BooksOverviewPage page={currentPage} booklist={booklist} />
        </motion.div>
    )
}
export default FinishedPage
