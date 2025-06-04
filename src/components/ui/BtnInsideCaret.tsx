// TODO handle styling via css class instead of buttonStyle
const BtnInsideCaret = ({
    buttonType,
    buttonStyle,
    buttonOnClick,
}: {
    buttonType: "button" | "submit"
    buttonStyle?: React.CSSProperties
    buttonOnClick?: () => Promise<void> | void
}) => {
    return (
        <button
            type={buttonType ? buttonType : "button"}
            style={buttonStyle && buttonStyle}
            className="btn-submit-inside-caret-right"
            onClick={buttonOnClick && buttonOnClick}
            onKeyDown={buttonOnClick && buttonOnClick}
        />
    )
}
export default BtnInsideCaret
