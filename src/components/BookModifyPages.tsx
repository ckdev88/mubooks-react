import { useContext, useEffect } from "react"
import { IsModdingPagesContext } from "@/components/BookSummary/PagesAmount"
import BtnInsideCaret from "@/components/ui/buttons/BtnInsideCaret"
import useChangePages from "@/hooks/useChangePages"
import BtnCancel from "@/components/ui/buttons/BtnCancel"

const BookModifyPages = ({
    book_id,
    book_number_of_pages_median
}: {
    book_id: Book["id"]
    book_number_of_pages_median: Book["number_of_pages_median"]
}) => {
    const { isModding, setIsModding } = useContext(IsModdingPagesContext)
    const [processForm] = useChangePages(book_id)

    const input = {
        form_class: "single-small-form wm6",
        type: "number",
        name: "pagesAmount",
        id: "pages_" + book_id,
        default: book_number_of_pages_median,
        placeholder: "0"
    }

    useEffect(() => {
        if (isModding) document.getElementById(input.id)?.focus()
    }, [isModding, input.id])

    return (
        <>
            <form className={input.form_class} onSubmit={processForm}>
                <input
                    type={input.type}
                    name={input.name}
                    id={input.id}
                    defaultValue={input.default}
                    placeholder={input.placeholder}
                    autoComplete="off"
                    min={input.type === "number" ? "0" : undefined}
                />
                <BtnInsideCaret bType="submit" bStyle={{ margin: ".26rem .2rem 0 -2rem" }} />
            </form>
            {isModding && <BtnCancel bOnClick={() => setIsModding(false)} />}
        </>
    )
}

export default BookModifyPages
