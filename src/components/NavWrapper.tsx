import { useContext, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { useNavigate, NavLink } from "react-router-dom"
import updatePreferences from "@/functions/updatePreferences"
import { isLocal, getTabTitle, getNavTitle } from "@/utils/Helpers"
import BtnNavBurgerToggle from "@/components/ui/buttons/BtnNavBurgerToggle"
import BtnNavZoek from "@/components//ui/buttons/BtnNavZoek"
import BtnNavDarkmodeToggle from "@/components//ui/buttons/BtnNavDarkmodeToggle"

const NavWrapper = () => {
    const navigate = useNavigate()
    const { userIsLoggedIn, darkTheme, setDarkTheme } = useContext(AppContext)

    const [nav0Expanded, setNav0Expanded] = useState(false)

    function toggleNav0() {
        setNav0Expanded(!nav0Expanded)
    }

    function goSearch() {
        setNav0Expanded(false)
        navigate("/search")
        setTimeout(() => {
            location.href = "#top"
            document.getElementById("search_term")?.focus()
        }, 80)
    }

    const navTitle: string = getNavTitle()
    document.title = getTabTitle()

    if (userIsLoggedIn === true)
        return (
            <div className={nav0Expanded ? "anyexpanded" : "allcollapsed"}>
                <nav id="navIcons">
                    <BtnNavBurgerToggle
                        bOnClick={() => toggleNav0()}
                        bClassname={nav0Expanded ? "expanded" : "collapsed"}
                    />
                    <div className="h1" id="navTitle">
                        {navTitle}
                    </div>
                    <div style={{ display: "flex", alignContent: "center" }}>
                        <BtnNavZoek bOnClick={() => goSearch()} />
                    </div>
                </nav>
                <nav
                    id="nav0"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignContent: "space-around",
                        alignItems: "flex-start",
                        gap: ".25rem",
                    }}
                    className={
                        nav0Expanded ? "expanded nav-collapsable" : "collapsed nav-collapsable"
                    }
                    aria-expanded={nav0Expanded ? "true" : "false"}
                >
                    <div
                        style={{
                            display: "flex",
                            width: "calc(100% - .3rem)",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <NavLink to={"/dashboard"} onClick={toggleNav0}>
                            Dashboard
                        </NavLink>
                        <NavLink to={"/addbook"} onClick={toggleNav0}>
                            Add book
                        </NavLink>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            width: "calc(100% - .3rem)",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <NavLink to={"/reading"} onClick={toggleNav0}>
                            Reading
                        </NavLink>
                        <NavLink to={"/statistics"} onClick={toggleNav0}>
                            Statistics
                        </NavLink>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            width: "calc(100% - .3rem)",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <NavLink to={"/wishlist"} onClick={toggleNav0}>
                            Wishlist
                        </NavLink>
                        <NavLink to={"/suggestions"} onClick={toggleNav0}>
                            Suggestions
                        </NavLink>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            width: "calc(100% - .3rem)",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <NavLink to={"/favourites"} onClick={toggleNav0}>
                            Favourites
                        </NavLink>
                        <NavLink to={"/account/profile"} onClick={toggleNav0}>
                            Profile
                        </NavLink>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "calc(100% - .3rem)",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <NavLink to={"/finished"} onClick={toggleNav0}>
                            Finished
                        </NavLink>
                        <NavLink to={"/account/logout"} onClick={toggleNav0}>
                            Logout
                        </NavLink>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            width: "calc(100% - .3rem)",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <NavLink to={"/savedbooks"} onClick={toggleNav0}>
                            Saved books
                        </NavLink>
                        <BtnNavDarkmodeToggle
                            bOnClick={() => {
                                setDarkTheme(!darkTheme)
                                updatePreferences(!darkTheme)
                            }}
                            bClassname={darkTheme ? "active" : ""}
                        />
                    </div>
                    <NavLink to={"/quoted"} onClick={toggleNav0}>
                        Quoted
                    </NavLink>
                    <NavLink to={"/tropes"} onClick={toggleNav0}>
                        Tropes
                    </NavLink>
                    <NavLink to={"/tossed"} onClick={toggleNav0}>
                        Tossed corner
                    </NavLink>
                    {isLocal() && (
                        <NavLink to={"/clear-my-books"} onClick={toggleNav0} className="dnone-sm">
                            Clear My Books
                        </NavLink>
                    )}
                </nav>
            </div>
        )
    return <></>
}
/*
Current layout:
dashboard -- add book
reading -- statistics
wishlist -- profile
favourites -- Logout
finished
Saved
quoted
tropes
clear my books
*/
export default NavWrapper
