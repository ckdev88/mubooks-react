import { useContext, useEffect, useState } from "react"
import BooksOverviewPage from "@/pages/books/BooksOverviewPage"
import { AppContext } from "@/context/AppContext"
import { Link } from "react-router-dom"
import Heading from "@/components/ui/Heading"
import { motion } from "motion/react"
import TossTossers from "@/components/TossTossers"

const pageTitle = "Removed books"
const pageTitleSub = "To permanently remove or not to permanently remove"
const currentPage = "tossed"

const TossedPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)

    const [books, setBooks] = useState<Books | undefined>(undefined)
    useEffect(() => {
        if (userMyBooks !== undefined) setBooks(userMyBooks.filter((b) => b.tossed && b.list > 0))
    }, [userMyBooks])
    const hasbooks: boolean = books !== undefined && books.length > 0

    return (
        <motion.div {...GLOBALS.motionPageProps}>
            <Heading text={pageTitle} icon="icon-reading.svg" sub={pageTitleSub} />
            {books !== undefined ? (
                hasbooks ? (
                    <>
                        <TossTossers />
                        <BooksOverviewPage
                            books={userMyBooks?.filter((book) => book.tossed && book.list > 0)}
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
                )
            ) : (
                <span className="loader-dots" />
            )}
        </motion.div>
    )
}
export default TossedPage
