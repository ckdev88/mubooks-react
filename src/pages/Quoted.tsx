import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import BooksOverviewPage from "@/components/BooksOverview/BooksOverview"
import { AppContext } from "@/context/AppContext"
import Heading from "@/components/ui/Heading"
import { motion } from "motion/react"

const pageTitle = "Mu Quotes"
const pageTitleSub = "Lines to remember"
const currentPage = "quoted"

const QuotedPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)

    const [quotedBooks, setQuotedBooks] = useState<Books | undefined>(undefined)

    useEffect(() => {
        if (userMyBooks !== undefined) {
            setQuotedBooks(
                userMyBooks.filter(
                    (book) =>
                        book.tossed !== true &&
                        ((book.review_fav_quote && book.review_fav_quote !== "") ||
                            (book.review_fav_quote2 && book.review_fav_quote2 !== ""))
                )
            )
        }
    }, [userMyBooks])

    return (
        <motion.div {...GLOBALS.motionPageProps}>
            <Heading text={pageTitle} icon={"icon-quoted.svg"} sub={pageTitleSub} />
            {quotedBooks !== undefined &&
                (quotedBooks.length > 0 ? (
                    <BooksOverviewPage books={quotedBooks} page={currentPage} />
                ) : (
                    <div>
                        <h4>No book quotes added yet, find them and add them.</h4>
                        <p>
                            <Link to={"/search"} className="wauto">
                                Search
                            </Link>
                        </p>
                    </div>
                ))}
        </motion.div>
    )
}
export default QuotedPage
