import { useState, useCallback } from "react"
import ReviewRatingView from "@/components/BookSummary/ReviewRatingView"
import ReviewRatingEdit from "@/components/BookSummary/ReviewRatingEdit"

interface Props {
    book_id: Book["id"]
    book_rate_stars?: Book["rate_stars"]
    book_rate_spice?: Book["rate_spice"]
    book_title_short: Book["title_short"]
    editMode: boolean
}
const ReviewRating = ({
    book_id,
    book_rate_stars = 0,
    book_rate_spice = 0,
    book_title_short,
    editMode
}: Props) => {
    const [reviewStars, setReviewStars] = useState(book_rate_stars)
    const [reviewSpice, setReviewSpice] = useState(book_rate_spice)

    const changeReviewRating = useCallback((review_type: ReviewRatingType, amount: Scale5) => {
        if (review_type === "rate_stars") setReviewStars(amount)
        else setReviewSpice(amount)
    }, [])

    if (editMode === true)
        return (
            <ReviewRatingEdit
                book_id={book_id}
                stars={reviewStars}
                spice={reviewSpice}
                book_title_short={book_title_short}
                changeReviewRating={changeReviewRating}
            />
        )

    return <ReviewRatingView book_id={book_id} stars={reviewStars} spice={reviewSpice} />
}
export default ReviewRating
