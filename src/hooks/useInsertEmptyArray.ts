import { supabase } from "../../utils/supabase"

/** Updates database json, returns either error message or msg prop */
export default function useInsertEmptyArray() {
    async function insertEmptyArray() {
        const { error } = await supabase
            .from("user_entries")
            .insert([{ json: [], testdata: "inserted empty" }])
            .select()

        console.log(error ? error.message : "gelukt!")
    }
    return insertEmptyArray
}
