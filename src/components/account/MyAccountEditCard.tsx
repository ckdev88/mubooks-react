import useCardRotate from "../../hooks/useCardRotate"
import { AppContext } from "../../App"
import { useContext } from "react"
import { supabase } from "../../../utils/supabase"
import Heading from "../ui/Heading"
import BtnBig from "../ui/buttons/BtnBig"
import BtnTextGeneral from "../ui/buttons/BtnTextGeneral"

export default function MyAccountEditCard() {
    const { see } = useCardRotate()
    const { username, setUsername, usermail, setUsermail } = useContext(AppContext)

    if (usermail === null) return <>Are you sure you are logged in?</>
    function afterSbUpdate(name: string, mail: string) {
        setUsername(name)
        setUsermail(mail)
        see()
    }

    const updateSbUser = async (
        form_username: string,
        form_usermail: string,
        form_userpass: string,
    ) => {
        if (form_userpass !== "") {
            const { error } = await supabase.auth.updateUser({
                // data, error
                email: form_usermail,
                password: form_userpass,
                data: { screenname: form_username },
            })
            if (error) console.log("Error updating user (24):", error)
            else {
                afterSbUpdate(form_username, form_usermail)
            }
        } else {
            const { error } = await supabase.auth.updateUser({
                // data, error
                email: form_userpass,
                data: { screenname: form_username },
            })
            if (error) console.log("Error updating user (34):", error)
            else afterSbUpdate(form_username, form_usermail)
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form_username: string = e.currentTarget.account_screenname.value.trim()
        const form_usermail: string = e.currentTarget.account_email.value.trim()
        const form_userpass: string = e.currentTarget.account_password.value.trim()
        updateSbUser(form_username, form_usermail, form_userpass)
    }

    return (
        <>
            <div className="card">
                <header>
                    <Heading
                        text="Edit my account"
                        sub="Change my preferences"
                        icon="icon-profile.svg"
                    />
                </header>
                <main>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="account_screenname">
                            <div className="description">Screen name</div>
                            <input
                                type="text"
                                id="account_screenname"
                                name="account_screenname"
                                defaultValue={username ? username : ""}
                                autoComplete="off"
                            />
                        </label>
                        <label htmlFor="account_email">
                            <div className="description">Email address</div>
                            <input
                                type="email"
                                id="account_email"
                                name="account_email"
                                defaultValue={usermail}
                                autoComplete="username"
                            />
                        </label>
                        <label htmlFor="account_password">
                            <div className="description">
                                Password (leave empty to keep current)
                            </div>
                            <input
                                type="password"
                                id="account_password"
                                name="account_password"
                                defaultValue=""
                                autoComplete="new-password"
                            />
                        </label>
                        <BtnBig bType="submit" bText="Save and return" />
                    </form>
                </main>
                <footer>
                    <BtnTextGeneral bOnClick={see} bText="Return without saving" />
                </footer>
                )
            </div>
        </>
    )
}
