// TODO handle styling via css modules and/or  of styled components
/**
 * Big red button component: default/fallback param values
 * ------------------------------------------------------
 * `bText` - "Cancel"
 * `bType` - "button"
 */
const BtnBigRed = ({
    bText,
    bType,
    bOnClick,
    bActiveForm,
}: {
    bText: string
    bType?: "button" | "submit" | "reset"
    bOnClick?: () => void
    bActiveForm?: boolean
}) => {
    let pClassName = "btn btn-lg btn-red mb10"
    if (bActiveForm === true) pClassName += " active"
    return (
        <button type={bType ? bType : "button"} className={pClassName} onClick={bOnClick}>
            {bText ? bText : "Add trope"}
        </button>
    )
}
export default BtnBigRed
