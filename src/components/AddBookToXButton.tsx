import { useCallback } from "react"
import getListName from "../functions/getListName"
import useMyBooksAdd from "../hooks/useMyBooksAdd"
import BtnTextGeneral from "./ui/buttons/BtnTextGeneral"
import collapseItem from "../utils/uiMisc"
import BtnHeart from "./ui/buttons/BtnHeart"
import shouldCollapse from "../utils/shouldCollapse"

function AddBookToXButton({
    bookProp,
    targetList,
    icon = false,
    button_title = "",
}: {
    bookProp: Book
    targetList: BookList
    icon: boolean
    button_title?: string
}) {
    const book: Book = bookProp
    const AddBookToXButtonAct = useMyBooksAdd({ book, targetList })

    const targetListName: string = getListName(targetList)
    const buttonTitle = button_title === "" ? `Add to ${targetListName}` : button_title
    const iconClassName = `icon icon-${targetListName}`

    // TODO apply not only to add/remove books, but also to Details like in Stats & synopsis, etc
    // TODO animations
    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO: should be handled, prio: med>
    const handleClick = useCallback(
        // biome-ignore lint/complexity/useArrowFunction: <TODO: flat arrow function really better that traditional?>
        async function (): Promise<void> {
            // TODO: animations tweak this
            if (shouldCollapse(targetList)) {
                await collapseItem(book.id).then(() => AddBookToXButtonAct())
            } else AddBookToXButtonAct()
        },
        // TODO animations check if book.list dependency is necessary
        [targetList, book.id, book.list, AddBookToXButtonAct],
    )

    // Show heart icon in top right, depending on targetList & icon args
    if (icon && targetList === 4) return <BtnHeart fn={AddBookToXButtonAct} faved={false} />

    return (
        <div className="mark">
            <BtnTextGeneral bOnClick={handleClick} bIcon={iconClassName} bText={buttonTitle} />
        </div>
    )
}
export default AddBookToXButton
