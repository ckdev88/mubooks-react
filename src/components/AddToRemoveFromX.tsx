import AddBookToXButton from "@/components/AddBookToXButton"
import RemoveBookFromXButton from "@/components/RemoveBookFromXButton"
import { useState } from "react"
import getListName from "@/functions/getListName"

/**
 * Show button which can add/remove
 * @prop {Book} book - book object
 * @prop {Page} currentPage - current page/path, without prefixed /
 * @prop {BookList} limit - 0 = no limit, so do all, otherwise just 1 of 1234 (wishlist, reading, saved, favourited)
 */
function AddToRemoveFromX({
    book,
    currentPage,
    limit
}: {
    book: Book
    currentPage: Page
    limit: BookList
}) {
    // limit 01234, 0 = no limit, so do all, otherwise just 1 of 1234 (wishlist, reading, saved, favourited)
    const [showHiddenMarks, setShowHiddenMarks] = useState<boolean>(currentPage === "tossed")

    // TODO memoize, this eats CPU
    if (
        currentPage !== "tossed" &&
        limit === 4 &&
        book.list > 2 &&
        location.pathname.slice(1) !== "tossed"
    ) {
        // favourited book (heart icon), on list 3 or 4
        return (
            <>
                {book.list === limit ? (
                    <RemoveBookFromXButton
                        bookProp={book}
                        targetList={book.list}
                        icon={true}
                        removeType="move"
                    />
                ) : (
                    <AddBookToXButton bookProp={book} targetList={limit} icon={true} />
                )}
            </>
        )
    }
    if (limit === 0) {
        return (
            <>
                {currentPage !== "tossed" ? (
                    <>
                        {!book.list ? (
                            // Add book to wishlist
                            <AddBookToXButton bookProp={book} targetList={1} icon={true} />
                        ) : book.list === 1 ||
                          (currentPage === "search" && (book.list < 2 || !book.list)) ? (
                            <AddBookToXButton
                                bookProp={book}
                                targetList={2}
                                icon={true}
                                button_title="Start reading"
                            />
                        ) : (
                            book.list === 2 && (
                                <AddBookToXButton
                                    bookProp={book}
                                    targetList={3}
                                    icon={true}
                                    button_title="Finish reading"
                                />
                            )
                        )}
                    </>
                ) : (
                    <RemoveBookFromXButton
                        bookProp={book}
                        targetList={book.list}
                        icon={true}
                        button_title={`Restore to ${getListName(book.list)}`}
                        removeType="untoss"
                    />
                )}

                {currentPage !== "dashboard" && currentPage !== "search" && (
                    <button
                        type="button"
                        className="btn-icon"
                        onClick={() => setShowHiddenMarks(!showHiddenMarks)}
                    >
                        <span className="icon icon-dots" />
                    </button>
                )}

                <div className={showHiddenMarks ? "marks" : "marks dnone"}>
                    {currentPage !== "tossed" ? (
                        <>
                            {book.list === 2 ? (
                                <RemoveBookFromXButton
                                    bookProp={book}
                                    targetList={2}
                                    icon={true}
                                    removeType="move"
                                    button_title="Move back to Wishlist"
                                />
                            ) : (
                                (book.list === 3 || book.list === 4) && (
                                    <RemoveBookFromXButton
                                        bookProp={book}
                                        targetList={3}
                                        icon={true}
                                        removeType="move"
                                        button_title="Move back to Reading"
                                    />
                                )
                            )}
                            <RemoveBookFromXButton
                                bookProp={book}
                                targetList={3}
                                removeType="toss"
                                icon={true}
                                button_title="Toss it"
                            />
                        </>
                    ) : (
                        <RemoveBookFromXButton
                            bookProp={book}
                            icon={true}
                            removeType="permatoss"
                            button_title="Permanently toss"
                        />
                    )}
                </div>
            </>
        )
    }
}
export default AddToRemoveFromX
