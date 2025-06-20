import { useContext } from "react"
import { AppContext } from "../App"
import { supabase } from "../../utils/supabase"

export default async function useUpdateDb({
    msg,
    logMsg,
    newJson,
}: { msg: string; logMsg?: string; newJson?: Books }) {
    const { userid } = useContext(AppContext)
    const { error } = await supabase
        .from("user_entries")
        .update({
            json: newJson,
            testdata: logMsg,
        })
        .eq("user_id", userid)
        .select("*")
    return error ? error.message : msg ? msg : ""
}
