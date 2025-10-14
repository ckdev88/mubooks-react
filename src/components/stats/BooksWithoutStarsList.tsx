import { HashLink } from "react-router-hash-link"
import { cleanAnchor } from "@/utils/cleanInput"
const BooksWithoutStarsList = ({
    booksWithoutStars,
    year
}: { booksWithoutStars: BooksWithoutStars; year: number }) => {
    return booksWithoutStars.map((b) => {
        const refer: string = "finished" + `#${cleanAnchor(b.title_short)}_${b.id}`
        return (
            <li key={"booksWithoutStars" + year + b.id}>
                <HashLink className="a-text italic" to={`/${refer}`}>
                    {b.title_short}
                </HashLink>
                <br />
            </li>
        )
    })
}
export default BooksWithoutStarsList
