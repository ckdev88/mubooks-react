import { useContext } from "react"
import { BooksOverviewFilterContext } from "../routes/books/BooksOverviewPage"
import BtnCancel from "./ui/BtnCancel"
const BooksOverviewFilterSort = () => {
    const { setBooksFilter, booksFilter } = useContext(BooksOverviewFilterContext)

    function updateBooksFilter(e: React.ChangeEvent<HTMLInputElement>): void {
        e.preventDefault()
        const searchTerm = e.target.value.toLowerCase()
        if (searchTerm.length > 0) setBooksFilter(searchTerm)
        else setBooksFilter("")
    }

    function cancelFilter() {
        setBooksFilter("")
    }

    function noSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return (
        <div id="booksoverview-filter-sort">
            <form className="single-small-form" onSubmit={noSubmit} id="filterForm">
                <input
                    type="text"
                    onChange={updateBooksFilter}
                    id="booksoverview-filter"
                    value={booksFilter}
                    placeholder="Filter on book title"
                />
            </form>
            {booksFilter.length > 0 && (
                <BtnCancel
                    bOnClick={() => cancelFilter()}
                    bText="Reset filter"
                />
            )}
        </div>
    )
}
export default BooksOverviewFilterSort
