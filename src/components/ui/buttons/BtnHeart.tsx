const BtnHeart = ({ fn, faved }: { fn: () => void; faved: boolean }): React.ReactNode => {
    let bClass = "icon-heart"
    if (faved === true) bClass += " active"
    else bClass += " inactive"
    return (
        <button
            type="button"
            className={bClass}
            onKeyDown={(event) => {
                if (event.key === "Enter") fn
            }}
            onClick={fn}
            aria-label={faved === true ? "Remove from favourites" : "Add to favourites"}
        >
            <span className="inside" />
        </button>
    )
}
export default BtnHeart
