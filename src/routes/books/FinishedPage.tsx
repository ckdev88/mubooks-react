import BooksOverviewPage from "./BooksOverviewPage"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"
import { motion } from "motion/react"

const pageTitle = "Finished books"
const pageTitleSub = "Done and counting"
const currentPage = "finished"
const booklist = 3

const FinishedPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)

    const [books, setBooks] = useState<Books | undefined>(undefined)

    useEffect(() => {
        userMyBooks !== undefined &&
            setBooks(
                userMyBooks
                    ?.filter((b) => (b.list === booklist || b.list === 4) && !b.tossed)
                    .sort((a, b) => (b.date_finished ?? 0) - (a.date_finished ?? 0)),
            )
    }, [userMyBooks])

    const hasbooks: boolean = books !== undefined && books.length > 0
    const pageTitleSubText = hasbooks ? books?.length + ". " + pageTitleSub : pageTitleSub

    return (
        <motion.div {...GLOBALS.motionPageProps} id="overview-wrapper">
            {/* TODO see if overview-wrapper should be used everywhere, more or nowhere */}
            <Heading text={pageTitle} icon="icon-finished.svg" sub={pageTitleSubText} />
            {books !== undefined ? (
                <>
                    {books.length > 0 ? (
                        <BooksOverviewPage books={books} page={currentPage} />
                    ) : (
                        <>
                            <p>Have any favourites? Add them to your favourites from here.</p>
                            <h4>Not finished any book yet.</h4>
                            <p>
                                Are you finished with the book you're reading?
                                <br />
                                Select and mark your{" "}
                                <Link to="/reading">currently reading book</Link> as finished.
                                <br />
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
export default FinishedPage
