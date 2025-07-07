import { Link } from "react-router-dom"
import BooksOverviewPage from "./BooksOverviewPage"
import { useContext, useEffect, useState } from "react"
import Heading from "../../components/ui/Heading"
import { AppContext } from "../../App"
import { motion } from "motion/react"

const pageTitle = "Saved books"
const pageTitleSub = "Books in whatever list"
const currentPage = "savedbooks"

const SavedBooksPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)
    const [books, setBooks] = useState<Books | undefined>(undefined)
    useEffect(() => {
        userMyBooks !== undefined && setBooks(userMyBooks.filter((book) => !book.tossed))
    }, [userMyBooks])
    const hasbooks: boolean = books !== undefined && books.length > 0
    const pageTitleSubText = hasbooks ? books?.length + ". " + pageTitleSub : pageTitleSub

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
            {books !== undefined ? (
                books.length > 0 ? (
                    <BooksOverviewPage books={books} page={currentPage} />
                ) : (
                    <>
                        <p>
                            An overview of my saved books, this includes books that are favourited,
                            read and finished, the wishlist and the book currently reading.
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
                )
            ) : (
                <span className="loader-dots" />
            )}
        </motion.div>
    )
}
export default SavedBooksPage
