import { useContext, useState } from "react"
import { BooksOverviewFilterContext } from "../routes/books/BooksOverviewPage"
import BtnCancel from "./ui/buttons/BtnCancel"
const BooksOverviewFilterSort = () => {
    const { setBooksFilter, booksFilter } = useContext(BooksOverviewFilterContext)

    const [showKeepTyping, setShowKeepTyping] = useState<boolean>(false)
    const [filterInput, setFilterInput] = useState("")

    function updateBooksFilter(val: string): void {
        setFilterInput(val)
        setBooksFilter(val.length > 1 ? val : undefined)
        setShowKeepTyping(val.length === 1)
    }

    function cancelFilter() {
        setBooksFilter("")
        setFilterInput("")
    }

    function noSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return (
        <div id="booksoverview-filter-sort">
            <form className="single-small-form" onSubmit={noSubmit} id="filterForm">
                <input
                    type="text"
                    onChange={(event) => updateBooksFilter(event.currentTarget.value)}
                    id="booksoverview-filter"
                    placeholder="Filter on book title or author"
                    value={filterInput}
                />
            </form>
            {booksFilter !== undefined && booksFilter.length > 0 && (
                <BtnCancel bOnClick={() => cancelFilter()} bText="Reset filter" bType="reset" />
            )}
            {showKeepTyping && <i>Keep typing...</i>}
        </div>
    )
}
export default BooksOverviewFilterSort
