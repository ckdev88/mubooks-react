import AddToRemoveFromX from "@/components/AddToRemoveFromX"
import BookStartedFinished from "@/components/BookStartedFinished"
import SearchSubjects from "@/components/SearchSubjects"
import { HashLink as Link } from "react-router-hash-link"
import { cleanAnchor } from "@/utils/cleanInput"
import SummaryReviews from "@/components/BookSummary/Reviews"
import BookPages from "@/components/BookSummary/PagesAmount"
import BookSummaryTitle from "@/components/BookSummary/Title"
import useGetSynopsis from "@/hooks/useGetSynopsis"
import BookSummaryAside from "@/components/BookSummary/Aside"
import BookSummaryStatus from "@/components/BookSummary/Status"
import BookSummaryReview from "@/components/BookSummary/Review"
import BookSummaryQuoted from "@/components/BookSummary/Quoted"
import BookSummarySynopsis from "@/components/BookSummary/Synopsis"
import ExpandableContainer from "@/components/ui/ExpandableContainer"

const synopsisPages: Page[] = ["search", "wishlist"]
const pagesMedianPages: Page[] = ["search", "reading", "finished", "dashboard", "favourites"]
const pagesReviewQuotes: Page[] = ["finished", "favourites", "savedbooks"]
const pagesHideHeart: Page[] = ["dashboard", "tossed"]
const pagesReadOnly: Page[] = ["dashboard"]

interface BookSummaryProps {
    book: Book
    currentPage: Page
    refer?: Page
    special?: "quote2"
    readOnly?: boolean
}
/** Organism of BookSummary, containing title, thumbnail, authors, reading date, review, quotes, etc */
const BookSummary = ({ book, currentPage, refer, special, readOnly }: BookSummaryProps) => {

    const synopsis = useGetSynopsis(book.id, book.cover_edition_key, synopsisPages, currentPage)

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
                <div className="seperator" />
                <BookSummaryAside book={book} currentPage={currentPage} />
                <div className="article-main">
                    {currentPage === "quoted" ? (
                        <BookSummaryQuoted
                            book={book}
                            special={special}
                            currentPage={currentPage}
                            refer={refer}
                        />
                    ) : (
                        <>
                            <header style={{ position: "relative", width: "100%" }}>
                                {!pagesHideHeart.includes(currentPage) && (
                                    // favourite heart icon button
                                    <AddToRemoveFromX
                                        book={book}
                                        limit={4}
                                        currentPage={currentPage}
                                    />
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
                                        readOnly={currentPage === "dashboard"}
                                    />
                                )}
                            </header>

                            <div className="summary-actions pt05">
                                {book.list > 1 && currentPage !== "search" && (
                                    <BookStartedFinished
                                        date_started={book.date_reading}
                                        date_finished={book.date_finished}
                                        book_id={book.id}
                                        list={book.list}
                                        readOnly={currentPage === "dashboard"}
                                    />
                                )}
                                {book.list > 2 && (
                                    <SummaryReviews
                                        book={book}
                                        currentPage={currentPage}
                                        readOnly={readOnly}
                                    />
                                )}
                                <div>
                                    {currentPage === "search" && (
                                        <BookSummaryStatus book={book} bookAnchor={bookAnchor} />
                                    )}
                                    {!pagesReadOnly.includes(currentPage) && (
                                        <AddToRemoveFromX
                                            book={book}
                                            limit={0}
                                            currentPage={currentPage}
                                        />
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <footer className="footer">
                    {pagesReviewQuotes.includes(currentPage) && book.list > 2 && (
                        <>
                            <BookSummaryReview
                                book_id={book.id}
                                o_key="review_fav_quote"
                                review_text={book.review_fav_quote}
                                readOnly={readOnly}
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
                    {currentPage !== "dashboard" && (
                        <>
                            {currentPage === "search" && book.subject && (
                                <SearchSubjects book_id={book.id} subjects={book.subject} />
                            )}
                            {synopsisPages.includes(currentPage) && synopsis && (
                                <ExpandableContainer buttonText="Synopsis" extraClass="synopsis">
                                    <BookSummarySynopsis synopsis={synopsis} />
                                </ExpandableContainer>
                            )}
                        </>
                    )}
                </footer>
            </article>
    )
}
export default BookSummary
