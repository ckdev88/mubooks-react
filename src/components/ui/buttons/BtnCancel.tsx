// TODO handle styling via css modules and/or  of styled components
/**
 * Cancel button component: default/fallback param values
 * ------------------------------------------------------
 * `bText` - "Cancel"
 * `bType` - "button"
 * `bClassName` - "btn-text btn-text-cancel {input}"
 */
const BtnCancel = ({
    bText,
    bType,
    bOnClick,
    bClassName,
    bStyle
}: {
    bText?: string
    bType?: "button" | "submit" | "reset"
    bOnClick?: () => Promise<void> | void
    bClassName?: string
    bStyle?: React.CSSProperties
}) => {
    return (
        <button
            type={bType ? bType : "button"}
            style={bStyle && bStyle}
            className={`btn-text btn-text-cancel ${bClassName || ""}`}
            onClick={bOnClick && bOnClick}
        >
            {bText ? bText : "Cancel"}
        </button>
    )
}
export default BtnCancel
