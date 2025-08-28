import { NavLink } from "react-router-dom"

export default function Footer() {
    return (
        <NavLink to="/suggestions" className="footer-suggestions">
            Share suggestions
        </NavLink>
    )
}
