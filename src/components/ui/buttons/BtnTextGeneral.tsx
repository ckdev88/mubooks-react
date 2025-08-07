import { memo } from "react"

const BtnTextGeneral = ({
    bOnClick,
    bIsLoading,
    bClassName,
    bIcon,
    bText,
    bAlign,
    readOnly,
}: {
    bOnClick?: () => Promise<void> | void
    bIsLoading?: boolean
    bClassName?: string
    bIcon?: string
    bText?: string | React.ReactNode
    bAlign?: "left" | "right" // will not work if bClassName contains "diblock"
    readOnly?: boolean
}) => {
    const buttonClasses = `btn-text ${bClassName} ${readOnly && "readonly"}`.trim()
    const buttonStyle = bAlign ? { justifySelf: bAlign } : undefined

    if (readOnly)
        return (
            <span className={buttonClasses} style={buttonStyle}>
                {bText}
            </span>
        )

    return (
        <button
            aria-busy={bIsLoading}
            className={buttonClasses}
            disabled={bIsLoading}
            onClick={bOnClick && bOnClick}
            style={buttonStyle}
            type="button"
        >
            {bIcon && <span className={`icon icon-${bIcon}`} aria-hidden="true" />}
            {bText}
            {bIsLoading && <span className="loader-dots" aria-label="loading" />}
        </button>
    )
}

export default memo(BtnTextGeneral)
