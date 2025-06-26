import { Link } from "react-router-dom"
import convertDate from "../helpers/convertDate"

const BookSummaryStatus = ({
    book,
    bookAnchor,
}: {
    book: Book
    bookAnchor: string
}) => {
    return (
        <div className="status" style={{ marginBottom: ".5rem" }}>
            {book.list > 0 && (
                <em>
                    {book.list === 1 && (
                        <>
                            In my <Link to={"/wishlist#" + bookAnchor}>wishlist</Link>.
                        </>
                    )}
                    {book.list === 2 && (
                        <>
                            <Link to={"/reading#" + bookAnchor}>Reading</Link>
                            {book.date_reading && (
                                <> since {convertDate(book.date_reading, "human")}</>
                            )}
                            .
                        </>
                    )}
                    {(book.list === 3 || book.list === 4) && (
                        <>
                            <Link to={"/finished#" + bookAnchor}>Finished</Link>
                            {book.date_finished && (
                                <> on {convertDate(book.date_finished, "human")}</>
                            )}
                            {book.list === 4 && (
                                <>
                                    &nbsp;and{" "}
                                    <Link to={"/favourites#" + bookAnchor}>favourited</Link>
                                </>
                            )}
                            .
                        </>
                    )}
                </em>
            )}
        </div>
    )
}
export default BookSummaryStatus
