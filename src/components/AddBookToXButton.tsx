import getListName from "../functions/getListName"
import useMyBooksAdd from "../hooks/useMyBooksAdd"
import BtnTextGeneral from "./ui/buttons/BtnTextGeneral"
import collapseItem from "../utils/uiMisc"
import BtnHeart from "./ui/buttons/BtnHeart"
import { useContext } from "react"
import { AppContext } from "../App"

const AddBookToXButton = ({
    bookProp,
    targetList,
    icon = false,
    button_title = "",
}: {
    bookProp: Book
    targetList: BookList
    icon: boolean
    button_title?: string
}) => {
    const { GLOBALS } = useContext(AppContext)
    if (button_title === "") button_title = `Add to ${getListName(targetList)}`

    const book: Book = bookProp
    const AddBookToXButtonAct = useMyBooksAdd({ book, targetList })

    const iconClassName = "icon icon-" + getListName(targetList)

    // OPTIMIZE apply function caching (forgot the hook name for now)
    async function handleClick() {
        await collapseItem(book.id).then(() => {
            setTimeout(() => {
                AddBookToXButtonAct()
            }, GLOBALS.bookRemoveAnimationDuration)
        })
    }
    // Show heart icon in top right, depending on targetList & icon args
    if (icon && targetList === 4) return <BtnHeart fn={AddBookToXButtonAct} faved={false} />

    return (
        <div className="mark">
            <BtnTextGeneral
                bOnClick={handleClick}
                bIcon={iconClassName}
                bText={button_title}
                // bIsLoading={isLoading}
            />
        </div>
    )
}
export default AddBookToXButton
