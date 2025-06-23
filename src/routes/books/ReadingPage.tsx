import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const pageTitle = `What I'm reading now`
const pageTitleSub = "Currently enjoying books"
let pageTitleSubText = pageTitleSub
const currentPage = "reading"
const booklist = 2

const ReadingPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)

    const [books, setBooks] = useState(
        userMyBooks.filter((book) => book.list === booklist && !book.tossed),
    )

    useEffect(() => {
        setBooks(userMyBooks.filter((book) => book.list === booklist && !book.tossed))
    }, [userMyBooks])

    let hasbooks: boolean
    if (books.length > 0) {
        hasbooks = true
        pageTitleSubText = books.length + ". " + pageTitleSub
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
