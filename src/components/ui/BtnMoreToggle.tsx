// TODO handle styling via css modules and/or  of styled components
/**
 * Cancel button component: default/fallback param values
 * ------------------------------------------------------
 * `bText` - "..."
 * `bType` - "button"
 * `bClassName` - "badge btn-text diblock {input}"
 */
const BtnMoreToggle = ({
    bText,
    bType,
    bOnClick,
    bClassName,
    bStyle,
}: {
    bText?: string
    bType?: "button" | "submit"
    bOnClick?: () => void
    bClassName?: string
    bStyle?: React.CSSProperties
}) => {
    return (
        <button
            type={bType ? bType : "button"}
            style={bStyle && bStyle}
            className={`badge btn-text diblock ${bClassName || ""}`}
            onClick={bOnClick && bOnClick}
        >
            {bText ? bText : "..."}
        </button>
    )
}
export default BtnMoreToggle
