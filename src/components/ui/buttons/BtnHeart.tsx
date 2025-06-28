const BtnHeart = ({ fn, faved }: { fn: () => void; faved: boolean }): React.ReactNode => {
    let bClass = "icon-heart"
    if (faved === true) bClass += " active"
    else bClass += " inactive"
    return (
        <button
            type="button"
            className={isActive ? "icon-heart active" : "icon-heart inactive"}
            onClick={() => {
                fn()
                setIsActive(!isActive)
            }}
            aria-label={faved === true ? "Remove from favourites" : "Add to favourites"}
        >
            <span className="inside" />
        </button>
    )
}
export default BtnHeart
