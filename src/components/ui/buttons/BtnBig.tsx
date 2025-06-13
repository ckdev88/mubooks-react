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
    bClassName,
}: {
    bText: string | React.ReactNode
    bType?: "button" | "submit" | "reset"
    bOnClick?: () => void
    bIsLoading?: boolean
    bClassName?: string
}) => {
    return (
        <button
            type={bType ? bType : "button"}
            className={"btn-lg " + bClassName}
            onClick={bOnClick}
            disabled={bIsLoading}
        >
            {bText} {bIsLoading && <span className="loader-dots" />}
        </button>
    )
}
export default BtnBig
