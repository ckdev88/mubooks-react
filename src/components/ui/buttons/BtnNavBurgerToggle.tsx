const BtnToggleNavBurger = ({
    bOnClick,
    bClassname,
}: { bOnClick?: () => Promise<void> | void; bIsLoading?: boolean; bClassname: string }) => {
    return (
        <button id="toggleNavBurger" type="button" className={bClassname} onClick={bOnClick}>
            <div className="burger">
                <div className="burgerbar bar1" />
                <div className="burgerbar bar2" />
                <div className="burgerbar bar2duplo" />
                <div className="burgerbar bar3" />
            </div>
        </button>
    )
}

export default BtnToggleNavBurger
