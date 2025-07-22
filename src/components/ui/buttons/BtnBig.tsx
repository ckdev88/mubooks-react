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
    bOnClick?: () => Promise<void> | void
    bIsLoading?: boolean
    bClassName?: string
    bText: string | React.ReactNode
    bType?: "button" | "submit" | "reset"
}) => {
    return (
        <button
            type={bType ? bType : "button"}
            className={"btn-lg " + bClassName}
            onClick={bOnClick && bOnClick}
            disabled={bIsLoading}
        >
            {bText} {bIsLoading && <span className="loader-dots" />}
        </button>
    )
}
export default BtnBig
