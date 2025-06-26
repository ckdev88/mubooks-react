const BtnTextGeneral = ({
    bOnClick,
    bIsLoading,
    bClassName,
    bIcon,
    bText,
}: {
    bOnClick?: () => Promise<void> | void
    bIsLoading?: boolean
    bClassName?: string
    bIcon?: string
    bText?: string | React.ReactNode
}) => {
    return (
        <button
            type="button"
            className={`btn-text ${bClassName ? bClassName : ""}`}
            onClick={bOnClick && bOnClick}
            disabled={bIsLoading}
        >
            {bIcon && <span className={`icon icon-${bIcon}`} />}
            {bText}
            {bIsLoading && <span className="loader-dots"> </span>}
        </button>
    )
}

export default BtnTextGeneral
