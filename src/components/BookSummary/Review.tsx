import { createContext, useState } from "react"
import BookModifyReview from "@/components/BookModifyReview"
import { getCurrentPage } from "@/utils/Helpers"

export const IsModdingReviewContext = createContext<IsModdingReviewContextType>(
    {} as IsModdingReviewContextType,
)

const BookSummaryReview = ({
    book_id,
    o_key,
    review_text,
    readOnly,
    editMode,
}: {
    book_id: Book["id"]
    o_key: "review_text" | "review_fav_quote" | "review_fav_quote2"
    review_text: Book["review_text"]
    readOnly?: boolean
    editMode?: boolean
}) => {
    // TODO readOnly and editMode seem to have overlap, see if they can be merged
    if (readOnly === undefined && editMode === false) readOnly = true

    // Return review in view-mode/readonly-mode, before the more elaborate view/edit toggle and its methods are defined
    if (readOnly) {
        if (review_text !== undefined && review_text.length > 0)
            return (
                <div
                    className={`review-text ${o_key} pt05 pb05${getCurrentPage() === "dashboard" ? " on-dashboard" : ""}`}
                >
                    {o_key === "review_fav_quote" || o_key === "review_fav_quote2" ? (
                        <>{`“${review_text}”`}</>
                    ) : (
                        <>{review_text}</>
                    )}
                </div>
            )
        return
    }

    // This is the default behavior:
    // Quotes & review are first shown as view, onKeyDown on it will enable modification, used in /quoted/ page
    // The modification of an (empty) quote or review also uses this
    if (review_text === undefined) review_text = ""
    let addButtonTitle: string
    if (o_key === "review_fav_quote") addButtonTitle = "Quote"
    else if (o_key === "review_fav_quote2") addButtonTitle = "one more quote"
    else addButtonTitle = "Review"
    const [reviewText, setReviewText] = useState<string>(review_text)
    const [isModding, setIsModding] = useState<boolean>(false)

    return (
        <IsModdingReviewContext.Provider
            value={{
                isModding,
                setIsModding,
                reviewText,
                setReviewText,
                o_key,
            }}
        >
            <div className={`review-text ${o_key} pt05`}>
                {isModding ? (
                    <BookModifyReview book_id={book_id} o_key={o_key} review_text={reviewText} />
                ) : (
                    <>
                        {reviewText && !readOnly && (
                            <div
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") setIsModding(true)
                                }}
                                onClick={() => setIsModding(true)}
                                className="pb05"
                            >
                                {o_key === "review_fav_quote" ? (
                                    <>{`“${reviewText}”`}</>
                                ) : o_key === "review_fav_quote2" ? (
                                    <>{`“${reviewText}”`}</>
                                ) : (
                                    <>{reviewText}</>
                                )}
                            </div>
                        )}
                        {(reviewText === "" || reviewText === undefined) && isModding === false && (
                            <button
                                type="button"
                                className={
                                    o_key === "review_fav_quote" || o_key === "review_fav_quote2"
                                        ? "btn-sm mb mxauto ml0 mt0"
                                        : "btn-sm mb0 ml0"
                                }
                                onClick={() => setIsModding(true)}
                            >
                                Add {addButtonTitle}
                            </button>
                        )}
                    </>
                )}
            </div>
        </IsModdingReviewContext.Provider>
    )
}
export default BookSummaryReview
