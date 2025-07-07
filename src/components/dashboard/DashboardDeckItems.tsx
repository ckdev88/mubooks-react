import { HashLink as Link } from "react-router-hash-link"
import DashboardDeckCovers from "./DashboardDeckCovers"

const DashboardDeckItems = ({ props }: { props: DeckItem }) => {
    if (props.books !== undefined) {
        if (props.books.length === 0) {
            return (
                <Link to={`/${props.page}`}>
                    <main className="toadd">
                        <aside>
                            <button type="button" className="btn-icon">
                                <img src={props.btnIconAdd} alt={`Add ${props.page}`} />
                            </button>
                        </aside>
                        {props.noBooksText}
                    </main>
                </Link>
            )
        }

        return (
            props.books.length > 0 && (
                <main className={props.page}>
                    <DashboardDeckCovers booksarr={props.books} page={props.page} />
                </main>
            )
        )
    }
}

export default DashboardDeckItems
