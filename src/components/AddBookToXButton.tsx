import getListName from "../functions/getListName"
import useMyBooksAdd from "../hooks/useMyBooksAdd"
import BtnTextGeneral from "./ui/buttons/BtnTextGeneral"
import fadeout from "../utils/uiMisc"
import BtnHeart from "./ui/buttons/BtnHeart"

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
    book_review_fav_quote2,
    book_review_tropes,
    tossed,
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
    book_review_fav_quote2: Book["review_fav_quote2"]
    book_review_tropes: Book["review_tropes"]
    tossed?: Book["tossed"]
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
        review_fav_quote2: book_review_fav_quote2,
        review_tropes: book_review_tropes,
        tossed: tossed,
    }
    const [AddBookToXButtonAct, isLoading] = useMyBooksAdd({ book, targetList })

    const iconClassName = "icon icon-" + getListName(targetList)

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
