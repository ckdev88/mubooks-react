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
    bText?: string
}) => {
    return (
        <button
            type="button"
            className={bClassName ? bClassName : "btn-text"}
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
