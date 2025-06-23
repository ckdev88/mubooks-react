import { useContext } from "react"
import { AppContext } from "../App"
import { supabase } from "../../utils/supabase"

/** Updates database json, returns either error message or msg prop */
export default function useUpdateDb({
    msg,
    logMsg,
    newJson,
}: { msg: string; logMsg?: string; newJson?: Books }) {
    const { userid, userMyBooks } = useContext(AppContext)

    async function runUpdateDb() {
        const { error } = await supabase
            .from("user_entries")
            .update({
                json: newJson ? newJson : userMyBooks,
                testdata: logMsg,
            })
            .eq("user_id", userid)
            .select("*")
        return error ? error.message : msg ? msg : ""
    }
    async function initUpdateDb() {
        const popupNote = await runUpdateDb()
        return popupNote
    }
    return initUpdateDb
}
