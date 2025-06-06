// TODO handle styling via css modules or styles components
// TODO create generic way so bStyle would not be necessary
/**
 * BtnInsideCaret button component: default/fallback param values
 * ------------------------------------------------------
 * `bType` - "button"
 * `bClassName` - "btn-submit-inside-caret-right {input}"
 * `bDisabled` - false
 */
const BtnInsideCaret = ({
    bType,
    bStyle,
    bOnClick,
    bClassName,
    bDisabled,
}: {
    bType?: "button" | "submit"
    bStyle?: React.CSSProperties
    bOnClick?: () => Promise<void> | void
    bClassName?: string
    bDisabled?: false
}) => {
    return (
        <button
            type={bType ? bType : "button"}
            style={bStyle && bStyle}
            className={`btn-submit-inside-caret-right${bClassName ? " " + bClassName : ""}`}
            onClick={bOnClick && bOnClick}
            disabled={bDisabled ? bDisabled : false}
        />
    )
}
export default BtnInsideCaret
