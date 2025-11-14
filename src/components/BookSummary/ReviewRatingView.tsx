import BtnBooksByRating from "@/components/ui/buttons/BtnBooksByRating"
import { AppContext } from "@/context/AppContext"
import { useContext } from "react"

interface Props {
    book_id: Book["id"]
    stars: Book["rate_stars"]
    spice: Book["rate_spice"]
}

export default function ReviewRatingView({ book_id, stars, spice }: Props) {
    const { rateSpice } = useContext(AppContext)
    function goBooksByRating(ratingType: "stars" | "spice") {
        const ratingAmount = ratingType === "stars" ? stars : spice
        console.log(
            `will later go to /savedbooks/sortedby/rating-${ratingType}/${ratingAmount} or something like that`,
            stars,
            spice
        )
    }

    return (
        <div className="review-rates">
            <div className="rate-stars">
                {(() => {
                    const items = []
                    for (let i = 1; i < stars + 1; i++) {
                        items.push(
                            <BtnBooksByRating
                                key={"stars" + book_id + i}
                                bOnClick={() => goBooksByRating("stars")}
                                rateType="star"
                                bActive={true}
                            />
                        )
                    }
                    return items
                })()}
            </div>
            {rateSpice && (
                <div className="rate-spice">
                    {(() => {
                        const items = []
                        for (let i = 1; i < spice; i++) {
                            items.push(
                                <BtnBooksByRating
                                    key={"spice" + book_id + i}
                                    bOnClick={() => goBooksByRating("spice")}
                                    rateType="spice"
                                    bActive={true}
                                />
                            )
                        }

                        return items
                    })()}
                </div>
            )}
        </div>
    )
}
