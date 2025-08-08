import { useContext, useEffect, useState } from "react"
import BooksOverviewPage from "@/pages/books/BooksOverviewPage"
import { AppContext } from "@/App"
import { Link } from "react-router-dom"
import Heading from "@/components/ui/Heading"
import { motion } from "motion/react"

const pageTitle = "Mu Wishlist"
const pageTitleSub = "Books I will read soon"
const currentPage = "wishlist"
const booklist = 1

const WishlistPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)

    const [books, setBooks] = useState<Books | undefined>(undefined)

    useEffect(() => {
        userMyBooks !== undefined &&
            setBooks(userMyBooks.filter((book) => book.list === booklist && !book.tossed))
    }, [userMyBooks])

    const hasbooks: boolean = books !== undefined && books.length > 0
    const pageTitleSubText = hasbooks ? books?.length + ". " + pageTitleSub : pageTitleSub

    return (
        <motion.div {...GLOBALS.motionPageProps}>
            <Heading text={pageTitle} icon={"icon-wishlist.svg"} sub={pageTitleSubText} />
            {books !== undefined ? (
                <>
                    {books.length > 0 ? (
                        <BooksOverviewPage books={books} page={currentPage} />
                    ) : (
                        <>
                            <h4>No books here yet.</h4>
                            <p>
                                Want to add a book to your wishlist?
                                <br />
                                <Link to="/search">Search</Link> or{" "}
                                <Link to="/addbook">Add a book yourself</Link>.
                                <br />
                                <br />
                                <Link to="/reading">See my reading list.</Link>
                                <br />
                            </p>
                        </>
                    )}
                </>
            ) : (
                <span className="loader-dots" />
            )}
        </motion.div>
    )
}
export default WishlistPage
