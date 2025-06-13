const BtnRate = ({
    bOnClick,
    rateType,
    bActive = false,
}: {
    bOnClick: () => void
    rateType: "eraser" | "star" | "spice"
    bActive?: boolean
}) => {
    let pClassName = `icon icon-${rateType}`
    if (bActive) pClassName += " active"
    return (
        <button type="button" className="btn-icon" onClick={bOnClick}>
            <span className={pClassName} />
        </button>
    )
}
export default BtnRate
