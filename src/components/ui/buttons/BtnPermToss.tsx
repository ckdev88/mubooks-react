const BtnPermToss = ({
    bOnClick,
    bIsLoading
}: {
    bOnClick?: () => Promise<void> | void
    bIsLoading?: boolean
}) => {
    return (
        <button
            type="button"
            className="btn-text red"
            onClick={bOnClick && bOnClick}
            disabled={bIsLoading}
        >
            <span className="icon icon-remove" />
            Permanently toss
        </button>
    )
}

export default BtnPermToss
