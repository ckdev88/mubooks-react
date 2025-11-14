import { supabase } from "../../utils/supabase"
interface Props {
    dark_theme?: boolean
    rate_spice?: boolean
    userid: string | null
}
interface Settings {
    dark_theme?: boolean | null | undefined
    rate_spice?: boolean | null | undefined
}

export default async function updateSettings(props: Props): Promise<void> {
    let tmpSettings: Settings = {}
    const res = await supabase.from("user_entries").select("settings")
    if (res.data !== null) tmpSettings = res.data[0].settings
    else return // TODO do some error feedback
    let testdata: string = ""

    if (typeof props.dark_theme === "boolean") {
        tmpSettings.dark_theme = props.dark_theme
        testdata = "theme bijgewerkt"
        console.log("set dark theme to", props.dark_theme)
    } else if (typeof props.rate_spice === "boolean") {
        tmpSettings.rate_spice = props.rate_spice
        testdata = "peppers bijgewerkt"
        console.log("set spice to", props.rate_spice)
    }
    if (testdata !== "") {
        await supabase
            .from("user_entries")
            .update({ settings: tmpSettings, testdata: testdata })
            .eq("user_id", props.userid)
    }
}
