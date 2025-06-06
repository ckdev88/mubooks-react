import { Link } from "react-router-dom"
import BooksOverviewPage from "./BooksOverviewPage"
import { useContext } from "react"
import Heading from "../../components/ui/Heading"
import { AppContext } from "../../App"
import { motion } from "motion/react"

const pageTitle = "Saved books"
const pageTitleSub = "Books in whatever list"
let pageTitleSubText = pageTitleSub
const currentPage = "savedbooks"
const booklist = undefined

export default function SavedBooksPage() {
    const { userMyBooks, GLOBALS } = useContext(AppContext)
    let hasbooks = false
    const arrLength = userMyBooks.filter((book) => book.list && book.list > 0).length

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
            <Heading text={pageTitle} icon={"icon-saved.svg"} sub={pageTitleSubText} />
            {!hasbooks && (
                <>
                    <p>
                        An overview of my saved books, this includes books that are
                        favorited, read and finished, the wishlist and the book currently
                        reading.
                    </p>
                    <div>
                        <h4>No books added yet, find them and add them.</h4>
                        <p>
                            <Link to={"/search"} className="wauto">
                                Search
                            </Link>
                        </p>
                    </div>
                </>
            )}
            <BooksOverviewPage page={currentPage} booklist={booklist} />
        </motion.div>
    )
}
