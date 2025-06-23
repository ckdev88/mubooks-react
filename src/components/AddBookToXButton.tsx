import getListName from "../functions/getListName"
import useMyBooksAdd from "../hooks/useMyBooksAdd"
import BtnTextGeneral from "./ui/buttons/BtnTextGeneral"
import fadeout from "../utils/uiMisc"
import BtnHeart from "./ui/buttons/BtnHeart"

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
    const [AddBookToXButtonAct, isLoading] = useMyBooksAdd({ book, targetList })

    const iconClassName = "icon icon-" + getListName(targetList)

    // Show heart icon in top right, depending on targetList & icon args
    if (icon && targetList === 4) return <BtnHeart fn={AddBookToXButtonAct} faved={false} />

    return (
        <div className="mark">
            <BtnTextGeneral
                bOnClick={() => {
                    // TODO: fadeout animation is a bit meh
                    fadeout(book.id)
                    AddBookToXButtonAct()
                }}
                bIcon={iconClassName}
                bText={button_title}
                bIsLoading={isLoading}
            />
        </div>
    )
}
export default AddBookToXButton
