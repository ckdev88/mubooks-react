import { useCallback, useContext } from "react"
import { AppContext } from "@/context/AppContext"
import useMyBooksUpdateDb from "@/hooks/useMyBooksUpdateDb"
import BtnRate from "@/components/ui/buttons/BtnRate"

const maxRatingOptions = 6 // 5*stars + 1*erase ... 0 t/m 5

interface Props {
    book_id: Book["id"]
    book_title_short: Book["title_short"]
    stars: Book["rate_stars"]
    spice: Book["rate_spice"]
    changeReviewRating: (review_type: ReviewRatingType, amount: Scale5) => void
}
type ReviewRatingType = "rate_stars" | "rate_spice"

export default function ReviewRatingEdit({
    book_id,
    stars,
    spice,
    book_title_short,
    changeReviewRating
}: Props) {
    const { userMyBooks } = useContext(AppContext)

    const msg: string = "Added rating for " + book_title_short
    // TODO data_hooks_methods: might be better to just refer to updateEntriesDb.ts: updateEntriesDb
    const updateMyBooksDb = useMyBooksUpdateDb({
        myBooksNew: userMyBooks || [],
        book_id,
        msg
    })

    const updateRating = useCallback(
        async (review_type: ReviewRatingType, rating: Scale5) => {
            if (userMyBooks === undefined) return
            const userMyBooksCopy: Books = [...userMyBooks]

            for (let i = 0; i < userMyBooksCopy.length; i++) {
                if (userMyBooksCopy[i].id === book_id) {
                    userMyBooksCopy[i][review_type] = rating
                    break
                }
            }

            await updateMyBooksDb()
        },
        [book_id, userMyBooks, updateMyBooksDb]
    )

    const updateRatingInit = useCallback(
        (review_type: ReviewRatingType, amount: Scale5) => {
            // change rating within ReviewRating component
            changeReviewRating(review_type, amount)
            // change rating in global state and database
            updateRating(review_type, amount)
        },
        [updateRating, changeReviewRating]
    )

    const renderRatingButtons = useCallback(
        (review_type: ReviewRatingType, curRating: Scale5) => {
            return (
                <div className={review_type}>
                    <BtnRate bOnClick={() => updateRatingInit(review_type, 0)} rateType="eraser" />
                    {(() => {
                        const items = []
                        for (let i = 1; i < maxRatingOptions; i++) {
                            items.push(
                                <BtnRate
                                    key={"book_" + review_type + book_id + i}
                                    bOnClick={() => updateRatingInit(review_type, i as Scale5)}
                                    rateType={review_type === "rate_stars" ? "star" : "spice"}
                                    bActive={curRating > i - 1}
                                />
                            )
                        }
                        return items
                    })()}
                </div>
            )
        },
        [book_id,updateRatingInit]
    )

    return (
        <div className="review-rates">
            {renderRatingButtons("rate_stars", stars)}
            {renderRatingButtons("rate_spice", spice)}
        </div>
    )
}
