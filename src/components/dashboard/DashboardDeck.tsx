import { Link } from "react-router-dom"
import DashboardDeckItems from "@/components/dashboard/DashboardDeckItems"
import Heading from "@/components/ui/Heading"

function DashboardDeck({ props }: { props: DeckItem | undefined }) {
    return (
        <article className="adder">
            {props?.page && (
                <Link to={"/" + props.page} aria-label={`Navigate to ${props.title}`}>
                    <Heading text={props.title} icon={props.icon} el="adder-header" />
                </Link>
            )}
            {props?.books && <DashboardDeckItems props={props} />}
        </article>
    )
}
export default DashboardDeck
