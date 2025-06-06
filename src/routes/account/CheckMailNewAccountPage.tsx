// TODO account_emails: design & copywrite confirmation email
import { useContext } from "react"
import { AppContext } from "../../App"
import { getNavTitle } from "../../Helpers"

document.title = getNavTitle()

const CheckMailNewAccountPage = () => {
    const { usermail } = useContext(AppContext)
    const recipientAddress = usermail
    return (
        <>
            <div className="h1">Check your email</div>
            <p>
                You should receive an email on{" "}
                <span className="bu">{recipientAddress}</span>&nbsp;containing a link to
                confirm your account, click it.
            </p>
        </>
    )
}
export default CheckMailNewAccountPage
