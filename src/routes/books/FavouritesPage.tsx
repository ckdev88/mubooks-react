import { useContext, useEffect, useState } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const pageTitle: string = "Favourites"
const pageTitleSub = "Beloved and adored books"
const currentPage: Page = "favourites"
const booklist = 4

const FavouritesPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)

    const [books, setBooks] = useState<Books | undefined>(undefined)
    useEffect(() => {
        userMyBooks !== undefined &&
            setBooks(
                userMyBooks
                    .filter((i) => i.list === booklist && !i.tossed)
                    .sort((a, b) => (b.date_finished ?? 0) - (a.date_finished ?? 0)),
            )
    }, [userMyBooks])

    const hasbooks: boolean = books !== undefined && books.length > 0
    const pageTitleSubText =
        hasbooks && books !== undefined ? books.length + ". " + pageTitleSub : pageTitleSub

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
            <Heading text={pageTitle} icon={"icon-favourites.svg"} sub={pageTitleSubText} />
            {books !== undefined ? (
                books.length > 0 ? (
                    <BooksOverviewPage page={currentPage} books={books} />
                ) : (
                    <>
                        <h4>No books marked as favourite yet.</h4>
                        <p>
                            Select and mark your favourite book from{" "}
                            <Link to="/finished">your finished books</Link> add to this list.
                        </p>
                    </>
                )
            ) : (
                <span className="loader-dots" />
            )}
        </motion.div>
    )
}
export default FavouritesPage
