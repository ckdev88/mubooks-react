import { useState } from "react"
import AddToRemoveFromX from "./AddToRemoveFromX"
import BookStartedFinished from "./BookStartedFinished"
import ReactMarkdown from "react-markdown"
import SearchSubjects from "./SearchSubjects"
import { HashLink as Link } from "react-router-hash-link"
import { cleanAnchor } from "../helpers/cleanInput"
import SummaryReviews from "./SummaryReviews"
import BookPages from "./BookPages"
import BookSummaryTitle from "./BookSummaryTitle"
import useGetSynopsis from "../hooks/useGetSynopsis"
import BookSummaryAside from "./BookSummaryAside"
import BookSummaryStatus from "./BookSummaryStatus"
import BookSummaryReview from "./BookSummaryReview"
import BtnTextGeneral from "./ui/buttons/BtnTextGeneral"
import BookSummaryQuoted from "./BookSummaryQuoted"

const synopsisPages: Page[] = ["search", "wishlist"]
const pagesMedianPages: Page[] = ["search", "reading", "finished"]
const pagesReviewQuotes: Page[] = ["finished", "favourites", "savedbooks"]

/** Organism of BookSummary, containing title, thumbnail, authors, reading date, review, quotes, etc */
const BookSummary = ({
    book,
    currentPage,
    refer,
    special,
}: { book: Book; currentPage: Page; refer?: Page; special?: "quote2" }) => {
    const synopsis = useGetSynopsis(book.id, book.cover_edition_key, synopsisPages, currentPage)
    const [isShowingSynopsis, setIsShowingSynopsis] = useState<boolean>(false)

    const bookAnchor: string = `${cleanAnchor(book.title_short)}_${book.id}`
    if (currentPage === "quoted") refer = "savedbooks#" + bookAnchor

    return (
        <article
            id={`bookSummaryTransitioner${book.id}`}
            className={
                book.list > 0 && currentPage === "search"
                    ? "book-summary saved"
                    : `book-summary ${currentPage} transition-wrapper`
            }
        >
            <div style={{ marginTop: "-4rem", position: "absolute" }} id={bookAnchor} />
            <BookSummaryAside book={book} currentPage={currentPage} />
            <div className="article-main">
                {currentPage === "quoted" ? (
                    <BookSummaryQuoted book={book} special={special} currentPage={currentPage} />
                ) : (
                    <>
                        <header style={{ position: "relative", width: "100%" }}>
                            {currentPage !== "dashboard" && currentPage !== "tossed" && (
                                // favourite heart icon button
                                <AddToRemoveFromX book={book} limit={4} currentPage={currentPage} />
                            )}
                            {currentPage === "dashboard" && refer !== undefined ? (
                                // click on title to directly scroll to target in list
                                <Link to={`/${refer}`}>
                                    <BookSummaryTitle
                                        book_author_name={book.author_name}
                                        book_first_publish_year={book.first_publish_year}
                                        book_id={book.id}
                                        book_title_short={book.title_short}
                                        currentPage={currentPage}
                                    />
                                </Link>
                            ) : (
                                // just show the title
                                <BookSummaryTitle
                                    book_author_name={book.author_name}
                                    book_first_publish_year={book.first_publish_year}
                                    book_id={book.id}
                                    book_title_short={book.title_short}
                                    currentPage={currentPage}
                                />
                            )}
                            {pagesMedianPages.includes(currentPage) && (
                                <BookPages
                                    book_id={book.id}
                                    book_number_of_pages_median={book.number_of_pages_median}
                                />
                            )}
                        </header>

                        <div className="summary-actions pt05">
                            <SummaryReviews book={book} currentPage={currentPage} />
                            {book.list > 1 && currentPage !== "search" && (
                                <BookStartedFinished
                                    date_started={book.date_reading}
                                    date_finished={book.date_finished}
                                    book_id={book.id}
                                    list={book.list}
                                />
                            )}
                            <div>
                                {currentPage === "search" && (
                                    <BookSummaryStatus book={book} bookAnchor={bookAnchor} />
                                )}
                                <AddToRemoveFromX book={book} limit={0} currentPage={currentPage} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            {currentPage !== "dashboard" && (
                <footer>
                    {pagesReviewQuotes.includes(currentPage) && (
                        <>
                            <BookSummaryReview
                                book_id={book.id}
                                o_key="review_fav_quote"
                                review_text={book.review_fav_quote}
                            />
                            {book.review_fav_quote && (
                                <BookSummaryReview
                                    book_id={book.id}
                                    o_key="review_fav_quote2"
                                    review_text={book.review_fav_quote2}
                                />
                            )}
                        </>
                    )}
                    {currentPage === "search" && book.subject && (
                        <SearchSubjects book_id={book.id} subjects={book.subject} />
                    )}
                    {synopsisPages.includes(currentPage) && synopsis ? (
                        <div className="synopsis" style={{ marginTop: ".75rem" }}>
                            <BtnTextGeneral
                                bClassName={
                                    isShowingSynopsis
                                        ? "caret-right-toggle active"
                                        : "caret-right-toggle"
                                }
                                bOnClick={() => setIsShowingSynopsis(!isShowingSynopsis)}
                                bText="Synopsis"
                            />
                            <div
                                className={
                                    isShowingSynopsis
                                        ? "mt05 expandable expanded"
                                        : "mt05 expandable collapsed"
                                }
                                aria-expanded={isShowingSynopsis}
                            >
                                <ReactMarkdown>{synopsis}</ReactMarkdown>
                            </div>
                        </div>
                    ) : (
                        // TODO openlibrary: make link like 'no synopsis yet... write one?' and link to the OL page
                        <></>
                    )}
                </footer>
            )}
        </article>
    )
}
export default BookSummary
