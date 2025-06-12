// TODO handle styling via css modules and/or  of styled components
/**
 * Big button component: default/fallback param values
 * ------------------------------------------------------
 * `bType` - "button"
 * `bClassName` - "btn-lg"
 */
const BtnBig = ({
    bText,
    bType,
    bOnClick,
    bIsLoading,
}: {
    bText: string | React.ReactNode
    bType?: "button" | "submit" | "reset"
    bOnClick?: () => void
    bIsLoading?: boolean
}) => {
    const pClassName = "btn-lg"
    return (
        <button
            type={bType ? bType : "button"}
            className={pClassName}
            onClick={bOnClick}
            disabled={bIsLoading}
        >
            {bText} {bIsLoading && <span className="loader-dots" />}
        </button>
    )
}
export default BtnBig
