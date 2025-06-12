import { useContext, useState } from "react"
import { AppContext } from "../App"
import useMyBooksUpdateDb from "../hooks/useMyBooksUpdateDb"
import BtnRate from "./ui/BtnRate"

const ReviewRating = ({
    book_id,
    book_rate_stars,
    book_rate_spice,
    book_title_short,
}: {
    book_id: Book["id"]
    book_rate_stars: Book["rate_stars"]
    book_rate_spice: Book["rate_spice"]
    book_title_short: Book["title_short"]
}) => {
    const { userMyBooks } = useContext(AppContext)

    const [reviewStars, setReviewStars] = useState(book_rate_stars)
    const [reviewSpice, setReviewSpice] = useState(book_rate_spice)

    const msg: string = "Added rating for " + book_title_short
    // TODO data_hooks_methods: might be better to just refer to updateEntriesDb.ts: updateEntriesDb
    const updateMyBooksDb = useMyBooksUpdateDb({
        myBooksNew: userMyBooks,
        book_id,
        msg,
    })

    function RateStars(book_id: Book["id"], type: "rate_stars" | "rate_spice", rating: Scale5) {
        let myBooks: Books
        if (userMyBooks !== undefined) myBooks = userMyBooks
        else myBooks = []

        for (let i = 0; i < myBooks.length; i++) {
            if (myBooks[i].id === book_id) {
                if (type === "rate_stars") myBooks[i].rate_stars = rating
                if (type === "rate_spice") myBooks[i].rate_spice = rating
                break
            }
        }
        updateMyBooksDb()
        return myBooks
    }

    function RateStarsAct(type: "rate_stars" | "rate_spice", amount: Scale5): void {
        if (type === "rate_stars") setReviewStars(amount)
        if (type === "rate_spice") setReviewSpice(amount)
        RateStars(book_id, type, amount)
    }

    if (book_rate_stars === undefined) book_rate_stars = 0
    if (book_rate_spice === undefined) book_rate_spice = 0

    return (
        <div className="review-rates">
            <div className="rate-stars">
                <BtnRate bOnClick={() => RateStarsAct("rate_stars", 0)} rateType="eraser" />
                {(() => {
                    const items = []
                    for (let i = 1; i < 6; i++) {
                        items.push(
                            <BtnRate
                                key={"book_rate_stars" + book_id + i}
                                bOnClick={() => RateStarsAct("rate_stars", i as Scale5)}
                                rateType="star"
                                bActive={reviewStars > i - 1}
                            />,
                        )
                    }
                    return items
                })()}
            </div>
            <div className="rate-spice">
                <BtnRate bOnClick={() => RateStarsAct("rate_spice", 0)} rateType="eraser" />

                {(() => {
                    const items = []

                    for (let i = 1; i < 6; i++) {
                        items.push(
                            <BtnRate
                                key={"book_rate_spice" + book_id + i}
                                bOnClick={() => RateStarsAct("rate_spice", i as Scale5)}
                                rateType="spice"
                                bActive={reviewSpice > i - 1}
                            />,
                        )
                    }

                    return items
                })()}
            </div>
        </div>
    )
}
export default ReviewRating
