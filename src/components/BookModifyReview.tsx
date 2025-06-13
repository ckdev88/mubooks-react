/* TODO be able to add more than 1 quote, implications db & field type: string -> array, 'add extra quote' when
 isModding, on showing, pick a random quote of the array, quotes page don't know how to visualize this yet
 */
import { useContext, useEffect } from "react"
import { IsModdingReviewContext } from "./BookSummaryReview"
import BtnInsideCaret from "./ui/buttons/BtnInsideCaret"
import useChangeReview from "../hooks/useChangeReview"
import BtnCancel from "./ui/buttons/BtnCancel"

/** Modify review, triggered when state of isModding is true */
const BookModifyReview = ({
    book_id,
    o_key,
    review_text,
}: {
    book_id: Book["id"]
    o_key: "review_text" | "review_fav_quote" | "review_fav_quote2"
    review_text: Book["review_text"]
}) => {
    const { isModding, setIsModding } = useContext(IsModdingReviewContext)
    const [processForm] = useChangeReview(book_id, o_key)

    let inputPlaceholder = "Add review"
    if (o_key === "review_fav_quote") inputPlaceholder = "Add your favorite quote"
    else if (o_key === "review_fav_quote2") inputPlaceholder = "Your second favorite quote"

    const input = {
        form_class: "single-small-form clr",
        type: "text",
        name: "review_text",
        id: o_key + "_" + book_id,
        default: review_text,
        placeholder: inputPlaceholder,
    }

    useEffect(() => {
        if (isModding) document.getElementById(input.id)?.focus()
    }, [isModding, input.id])

    return (
        <>
            <form className={input.form_class} onSubmit={processForm}>
                <input
                    type={input.type}
                    name={input.name}
                    id={input.id}
                    defaultValue={input.default}
                    placeholder={input.placeholder}
                    autoComplete="off"
                    min={input.type === "number" ? "0" : undefined}
                />
                <BtnInsideCaret bType="submit" bStyle={{ margin: ".25rem 0 0 -2rem" }} />
            </form>
            {isModding && <BtnCancel bOnClick={() => setIsModding(false)} />}
        </>
    )
}

export default BookModifyReview
