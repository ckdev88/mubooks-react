import Heading from "@/components/ui/Heading"
import BtnNavDarkmodeToggle from "@/components/ui/buttons/BtnNavDarkmodeToggle"
import { AppContext } from "@/context/AppContext"
import { useContext } from "react"
// import updatePreferences from "@/functions/updatePreferences"
import updateSettings from "@/functions/updateSettings"

export default function SettingsPage() {
    const { setDarkTheme, darkTheme, rateSpice, setRateSpice, userid } = useContext(AppContext)
    return (
        <>
            <Heading el="h1" text="Settings page" sub="Update your preferences" />
            <Heading el="h2" text="Dark mode" />
            <BtnNavDarkmodeToggle
                bOnClick={() => {
                    setDarkTheme(!darkTheme)
                    updateSettings({ dark_theme: !darkTheme, userid: userid })
                }}
                bClassname={darkTheme ? "active" : ""}
            />
            <Heading el="h2" text="Show spice rating" />
            {rateSpice ? "show" : "dont show"}
            <button
                onClick={() => {
                    setRateSpice(!rateSpice)
                    updateSettings({ rate_spice: !rateSpice, userid: userid })
                }}
                type="button"
            >
                Toggle
            </button>
        </>
    )
}
