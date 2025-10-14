import { supabase } from "@/../utils/supabase"

/** Updates database json, returns either error message or msg prop */
export default async function updateDb({
    msg,
    newJson,
    userid
}: { msg: string; newJson: Books; userid: string }) {
    async function runUpdateDb() {
        const { error } = await supabase
            .from("user_entries")
            .update({
                json: newJson,
                testdata: msg
            })
            .eq("user_id", userid)
            .select("*")
        return error ? error.message : msg ? msg : ""
    }
    const popupNote = await runUpdateDb()
    return popupNote
}
