import useBtnHeartAnimation from "@/hooks/useBtnHeartAnimation"
const BtnHeart = ({ fn, faved }: { fn: () => void; faved: boolean }): React.ReactNode => {
    const { showAnimation, isFaved, buttonClassName } = useBtnHeartAnimation(faved)
    function handleClick() {
        showAnimation()
        fn()
    }

    return (
        <button
            type="button"
            className={buttonClassName}
            onClick={handleClick}
            aria-label={isFaved === true ? "Remove from favourites" : "Add to favourites"}
        >
            <span className="inside" />
        </button>
    )
}
export default BtnHeart
