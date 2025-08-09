import { useContext, useEffect, useState } from "react"
import BooksOverviewPage from "@/components/BooksOverview/BooksOverview"
import { AppContext } from "@/context/AppContext"
import { Link } from "react-router-dom"
import Heading from "@/components/ui/Heading"
import { motion } from "motion/react"

const pageTitle = `What I'm reading now`
const pageTitleSub = "Currently enjoying books"
const currentPage = "reading"
const booklist = 2

const ReadingPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)

    const [books, setBooks] = useState<Books | undefined>(undefined)
    useEffect(() => {
        userMyBooks !== undefined &&
            setBooks(userMyBooks.filter((b) => b.list === booklist && !b.tossed))
    }, [userMyBooks])
    const hasbooks: boolean = books !== undefined && books.length > 0
    const pageTitleSubText = hasbooks ? books?.length + ". " + pageTitleSub : pageTitleSub

    return (
        <motion.div {...GLOBALS.motionPageProps}>
            <Heading text={pageTitle} icon={"icon-reading.svg"} sub={pageTitleSubText} />
            {books !== undefined ? (
                books.length > 0 ? (
                    <BooksOverviewPage books={books} page={currentPage} />
                ) : (
                    <p>
                        Want to add a book to your reading list?
                        <br />
                        <Link to="/wishlist">View your wishlist</Link> or{" "}
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
export default ReadingPage
