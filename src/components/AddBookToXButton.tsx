import getListName from "../functions/getListName"
import useMyBooksAdd from "../hooks/useMyBooksAdd"
import BtnTextGeneral from "./ui/buttons/BtnTextGeneral"
import collapseItem from "../utils/uiMisc"
import BtnHeart from "./ui/buttons/BtnHeart"
import checkPreventCollapse from "../utils/checkPreventCollapse"

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
    if (button_title === "") button_title = `Add to ${getListName(targetList)}`

    const book: Book = bookProp
    const AddBookToXButtonAct = useMyBooksAdd({ book, targetList })

    const iconClassName = "icon icon-" + getListName(targetList)

    async function handleClick(): Promise<void> {
        const currentPage = window.location.pathname.slice(1) as PageWithoutParameters
        if (checkPreventCollapse(targetList, currentPage)) return AddBookToXButtonAct()
        await collapseItem(book.id).then(() => AddBookToXButtonAct())
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
