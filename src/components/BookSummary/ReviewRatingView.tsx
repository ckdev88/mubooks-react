import BtnBooksByRating from "@/components/ui/buttons/BtnBooksByRating"

interface Props {
    book_id: Book["id"]
    stars: Book["rate_stars"]
    spice: Book["rate_spice"]
}

export default function ReviewRatingView({ book_id, stars, spice }: Props) {
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
                                key={"book_rate_stars" + book_id + i}
                                bOnClick={() => goBooksByRating("stars")}
                                rateType="star"
                                bActive={true}
                            />
                        )
                    }
                    return items
                })()}
            </div>
            <div className="rate-spice">
                {(() => {
                    const items = []
                    for (let i = 1; i < spice + 1; i++) {
                        items.push(
                            <BtnBooksByRating
                                key={"book_rate_spice" + book_id + i}
                                bOnClick={() => goBooksByRating("spice")}
                                rateType="spice"
                                bActive={true}
                            />
                        )
                    }

                    return items
                })()}
            </div>
        </div>
    )
}
