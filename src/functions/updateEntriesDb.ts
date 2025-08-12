import { supabase } from "../../utils/supabase"
import { notification as nm } from "../i18n/notifications"

// very much alike ./src/functions/updateTropesDb.ts
// used in ./src/pages/books/AddBookPage
async function updateEntriesDbxxx(newArr: Books, userid: string): Promise<string> {
    let msg = ""
    const { error } = await supabase
        .from("user_entries")
        .update({
            json: newArr,
            testdata: "updated... some specific message will be built later",
        })
        .eq("user_id", userid)
        .select("*")
    if (error) msg = error.message
    else msg = nm.Updated
    return msg
}

export default updateEntriesDbxxx
