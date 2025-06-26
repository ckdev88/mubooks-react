// TODO is this used?
const BtnToss = ({
    bOnClick,
    bIsLoading,
}: { bOnClick?: () => Promise<void> | void; bIsLoading?: boolean }) => {
    return (
        <button
            type="button"
            className="btn-text red"
            onClick={bOnClick && bOnClick}
            disabled={bIsLoading}
        >
            <span className="icon icon-remove" />
            Toss it
        </button>
    )
}

export default BtnToss
