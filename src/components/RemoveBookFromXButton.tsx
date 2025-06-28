import getListName from "../functions/getListName"
import BtnTextGeneral from "./ui/buttons/BtnTextGeneral"
import collapseItem from "../utils/uiMisc"
import BtnHeart from "./ui/buttons/BtnHeart"
import useMyBooksRemove from "../hooks/useMyBooksRemove"
import { useContext } from "react"
import { AppContext } from "../App"

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
    icon: boolean
    button_title?: string
    removeType: "move" | "toss" | "untoss" | "permatoss" | "permatoss_tossers"
}) => {
    const { GLOBALS } = useContext(AppContext)
    if (button_title === "") button_title = `Remove from ${getListName(targetList)}`

    const book: Book = bookProp
    const removeBookFromXButtonAct = useMyBooksRemove({ book, removeType, targetList })

    // Show heart icon in top right, depending on targetList & icon args
    if (icon && targetList === 4)
        return <BtnHeart fn={removeBookFromXButtonAct} faved={true}  />

    let actionIcon: string | undefined
    if (icon) {
        switch (removeType) {
            case "toss":
                actionIcon = "toss"
                break
            case "permatoss":
                actionIcon = "toss"
                break
            case "untoss":
                actionIcon = getListName(book.list as BookList)
                break
            default:
                actionIcon = getListName((book.list - 1) as BookList)
        }
    }

    // OPTIMIZE apply function caching (forgot the hook name for now)
    async function handleClick() {
        await collapseItem(book.id).then(() => {
            setTimeout(() => {
                removeBookFromXButtonAct()
            }, GLOBALS.bookRemoveAnimationDuration)
        })
    }

    return (
        <div className="mark">
            <BtnTextGeneral
                bOnClick={handleClick}
                bIcon={actionIcon}
                bText={
                    button_title
                        ? button_title
                        : `Move back to ${getListName((book.list - 1) as BookList)}`
                }
            />
        </div>
    )
}
export default RemoveBookFromXButton
