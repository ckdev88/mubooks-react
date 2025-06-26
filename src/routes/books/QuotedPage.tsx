import { Link } from "react-router-dom"
import BooksOverviewPage from "./BooksOverviewPage"
import { useContext } from "react"
import { AppContext } from "../../App"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const pageTitle = "Mu Quotes"
const pageTitleSub = "Lines to remember"
const currentPage = "quoted"
const booklist = undefined

const QuotedPage = () => {
    const { userMyBooks } = useContext(AppContext)

    let quotedbooks: Books
    let hasbooks: boolean
    if (userMyBooks === undefined) quotedbooks = []
    if (userMyBooks.length > 0) {
        quotedbooks = userMyBooks.filter(
            (book) =>
                book.tossed !== true &&
                ((book.review_fav_quote && book.review_fav_quote !== "") ||
                    (book.review_fav_quote2 && book.review_fav_quote2 !== "")),
        )
        if (quotedbooks.length > 0) hasbooks = true
        else hasbooks = false
    } else {
        hasbooks = false
        quotedbooks = []
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
        >
            <Heading text={pageTitle} icon={"icon-quoted.svg"} sub={pageTitleSub} />
            {hasbooks ? (
                <BooksOverviewPage booklist={booklist} books={quotedbooks} page={currentPage} />
            ) : (
                <div>
                    <h4>No books added yet, find them and add them.</h4>
                    <p>
                        <Link to={"/search"} className="wauto">
                            Search
                        </Link>
                    </p>
                </div>
            )}
        </motion.div>
    )
}
export default QuotedPage
