// TODO handle styling via css modules and/or  of styled components
/**
 * Cancel button component: default/fallback param values
 * ------------------------------------------------------
 * `bText` - "Cancel"
 * `bType` - "button"
 */
const BtnAddTrope = ({
    bText,
    bType,
    bOnClick,
    bActiveForm,
}: {
    bText: string
    bType?: "button" | "submit" | "reset"
    bOnClick?: () => void
    bActiveForm: boolean
}) => {
    let pClassName = "trope_add btn-sm mb0"
    if (bActiveForm === true) pClassName += " active"
    return (
        <button type={bType ? bType : "button"} className={pClassName} onClick={bOnClick}>
            {bText ? bText : "Add trope"}
        </button>
    )
}
export default BtnAddTrope
