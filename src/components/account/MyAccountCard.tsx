import { memo, useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "@/App"
import Heading from "@/components/ui/Heading"
import BtnBig from "@/components/ui/buttons/BtnBig"
import useCardRotate from "@/hooks/useCardRotate"
import useResetUsermail from "@/hooks/useResetUsermail"

function MyAccountCard() {
    const { change } = useCardRotate()
    const { username, usermail } = useContext(AppContext)

    useResetUsermail()

    return (
        <div className="card">
            <header>
                <Heading
                    text="My account"
                    icon="icon-profile.svg"
                    sub="An overview of my profile"
                />
            </header>
            <main>
                <dl className="account-details">
                    <dt>Screen name</dt>
                    <dd>{username || "-"}</dd>
                    <dt>Email address</dt>
                    <dd>{usermail}</dd>
                    <dt>Password</dt>
                    <dd>••••••</dd>
                </dl>
                <BtnBig bText="Change" bOnClick={change} />
            </main>
            <footer>
                <Link className="a-text" to="/dashboard" aria-label="Return to dashboard">
                    Return to dashboard
                </Link>
            </footer>
        </div>
    )
}

export default memo(MyAccountCard)
