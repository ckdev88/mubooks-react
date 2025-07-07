import { useMemo, useCallback } from "react"
import getListName from "../functions/getListName"
import BtnTextGeneral from "./ui/buttons/BtnTextGeneral"
import collapseItem from "../utils/uiMisc"
import BtnHeart from "./ui/buttons/BtnHeart"
import useMyBooksRemove from "../hooks/useMyBooksRemove"
import checkPreventCollapse from "../utils/checkPreventCollapse"

/**
 * Remove book from list where 1=Wishlist 2=Reading 3=Finished 4=Favourite or toss
 */
const RemoveBookFromXButton = ({
    bookProp,
    targetList = bookProp.list,
    icon = false,
    button_title = "",
    removeType,
}: {
    bookProp: Book
    targetList?: BookList
    icon?: boolean
    button_title?: string
    removeType: "move" | "toss" | "untoss" | "permatoss" | "permatoss_tossers"
}) => {
    const book: Book = bookProp
    const removeBookFromXButtonAct = useMyBooksRemove({ book, removeType, targetList })

    const targetListName = useMemo(() => getListName(targetList), [targetList])
    const previousListName = useMemo(() => getListName((book.list - 1) as BookList), [book.list])

    const buttonTitle = useMemo(() => {
        if (button_title) return button_title
        return removeType === "move"
            ? `Move back to ${previousListName}`
            : `Remove from ${targetListName}`
    }, [button_title, removeType, previousListName, targetListName])

    const actionIconFn = () => {
        // if (!icon) return undefined
        switch (removeType) {
            case "toss":
            case "permatoss":
                return "toss"
            case "untoss":
                return getListName(book.list as BookList)
            default:
                return previousListName
        }
    }
    const actionIcon = actionIconFn()

    const handleClick = useCallback(
        // biome-ignore lint/complexity/useArrowFunction: <TODO: arrow function call better?>
        async function (): Promise<void> {
            const currentPage = window.location.pathname.slice(1) as PageWithoutParameters
            if (checkPreventCollapse(targetList, currentPage, removeType))
                return removeBookFromXButtonAct()
            await collapseItem(book.id)
            removeBookFromXButtonAct() // OPTIMIZE to await or not to await here?
        },
        [targetList, removeType, book.id, removeBookFromXButtonAct],
    )

    // Show heart icon in top right, depending on targetList & icon args
    // OPTIMIZE make static pathnames dynamic or via settings.json
    // OPTIMIZE, just improve the whole thing, it's meh
    if (icon && targetList === 4 && removeType !== "permatoss" && removeType !== "untoss") {
        return <BtnHeart fn={handleClick} faved={true} />
    }

    // async function handleClick(): Promise<void> {
    //     const currentPage = window.location.pathname.slice(1) as PageWithoutParameters
    //     if (checkPreventCollapse(targetList, currentPage, removeType))
    //         return removeBookFromXButtonAct()
    //     await collapseItem(book.id).then(() => removeBookFromXButtonAct())
    // }

    return (
        <div className="mark">
            <BtnTextGeneral bOnClick={handleClick} bIcon={actionIcon} bText={buttonTitle} />
        </div>
    )
}
export default RemoveBookFromXButton
