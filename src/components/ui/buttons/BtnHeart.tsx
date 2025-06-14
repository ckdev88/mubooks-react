const BtnHeart = ({ fn, faved }: { fn: () => void; faved: boolean }): React.ReactNode => {
    let bClass = "icon-heart"
    if (faved === true) bClass += " active"
    else bClass += " inactive"
    return (
        <span
            className={bClass}
            onKeyDown={(event) => {
                if (event.key === "Enter") fn
            }}
            onClick={fn}
        />
    )
}
export default BtnHeart
