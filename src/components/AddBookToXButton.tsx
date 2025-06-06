import getListName from "../functions/getListName"
import useMyBooksAdd from "../hooks/useMyBooksAdd"

const AddBookToXButton = ({
    book_id,
    book_list,
    book_title,
    book_title_short,
    book_author_key,
    book_author_name,
    book_cover,
    book_cover_redir,
    book_cover_edition_key,
    book_first_publish_year,
    book_img,
    book_number_of_pages_median,
    targetList,
    icon = false,
    button_title = "",
    book_rate_stars,
    book_rate_spice,
    book_review_fav_quote,
    book_review_tropes,
}: {
    book_id: Book["id"]
    book_list: Book["list"]
    book_title: Book["title"]
    book_title_short: Book["title_short"]
    book_author_key: Book["author_key"]
    book_author_name: Book["author_name"]
    book_cover: Book["cover"]
    book_cover_redir?: Book["cover_redir"]
    book_cover_edition_key: Book["cover_edition_key"]
    book_first_publish_year: Book["first_publish_year"]
    book_img: Book["img"]
    book_number_of_pages_median: Book["number_of_pages_median"]
    targetList: BookList
    icon: boolean
    button_title?: string
    book_rate_stars: Book["rate_stars"]
    book_rate_spice: Book["rate_spice"]
    book_review_fav_quote: Book["review_fav_quote"]
    book_review_tropes: Book["review_tropes"]
}) => {
    if (button_title === "") button_title = `Add to ${getListName(targetList)}`

    const book: Book = {
        id: book_id,
        list: book_list,
        title: book_title,
        title_short: book_title_short,
        author_key: book_author_key,
        author_name: book_author_name,
        cover: book_cover,
        cover_redir: book_cover_redir,
        cover_edition_key: book_cover_edition_key,
        first_publish_year: book_first_publish_year,
        img: book_img,
        number_of_pages_median: book_number_of_pages_median,
        rate_stars: book_rate_stars,
        rate_spice: book_rate_spice,
        review_fav_quote: book_review_fav_quote,
        review_tropes: book_review_tropes,
    }
    const [AddBookToXButtonAct, isLoading] = useMyBooksAdd({ book, targetList })

    const iconClassName = "icon icon-" + getListName(targetList)

    function fadeout(): void {
        /** Temporary Current Page, taken from url */
        // OPTIMIZE: this same function is used in RemoveBookFromXButton & AddBookToXButton
        const tcp = window.location.pathname.replace("/", "")
        if (
            (tcp === "reading" && targetList !== 2) ||
            (tcp === "wishlist" && targetList !== 1) ||
            (tcp === "favorites" && targetList !== 4) ||
            (tcp === "finished" && targetList !== 3 && targetList !== 4)
        ) {
            document
                .getElementById(`bookSummaryTransitioner${book.id}`)
                ?.classList.add("fadeout")
        }
    }

    if (icon && targetList === 4)
        return (
            <span
                className="icon-heart inactive"
                onKeyDown={() => AddBookToXButtonAct()}
                onClick={() => AddBookToXButtonAct()}
            />
        )

    return (
        <div className="mark">
            <button
                className="btn-text"
                onKeyDown={() => {
                    fadeout()
                    AddBookToXButtonAct()
                }}
                onClick={() => {
                    fadeout()
                    AddBookToXButtonAct()
                }}
                disabled={isLoading}
                type="button"
            >
                <span className={iconClassName} />
                {button_title} {isLoading && <span className="loader-dots"> </span>}
            </button>
        </div>
    )
}
export default AddBookToXButton
