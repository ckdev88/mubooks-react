import { HashLink } from "react-router-hash-link"
import { cleanAnchor } from "../../helpers/cleanInput"
const BooksWithoutPagesList = ({
    booksWithoutPages,
    year,
}: { booksWithoutPages: BooksWithoutPages; year: number }) => {
    return (
        <div>
            <br />
            <i>* Books without pages defined</i>
            <ul className="mt0">
                {booksWithoutPages.map((b) => {
                    const refer: string = "finished" + `#${cleanAnchor(b.title_short)}_${b.id}`
                    return (
                        <li key={"booksWithoutPages" + year + b.id}>
                            <HashLink className="a-text italic" to={`/${refer}`}>
                                {b.title_short}
                            </HashLink>
                            <br />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default BooksWithoutPagesList
