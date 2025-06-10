import { useContext, useEffect } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const pageTitle: string = "Favorites"
const pageTitleSub = "Beloved and adored books"
let pageTitleSubText = pageTitleSub
const currentPage: Page = "favorites"
const booklist = 4

const FavoritesPage = () => {
    const { userMyBooks, setPageName, GLOBALS } = useContext(AppContext)
    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO OPTIMIZE>
    useEffect(() => {
        setPageName(currentPage)
    }, [])

    let hasbooks = false
    const arrLength = userMyBooks.filter((book) => book.list === booklist).length
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
            <Heading text={pageTitle} icon={"icon-favorites.svg"} sub={pageTitleSubText} />
            {!hasbooks && (
                <>
                    <h4>No books marked as favorite yet.</h4>
                    <p>
                        Select and mark your favorite book from{" "}
                        <Link to="/finished">your finished books</Link> add to this list.
                    </p>
                </>
            )}
            <BooksOverviewPage page={currentPage} booklist={booklist} />
        </motion.div>
    )
}
export default FavoritesPage
