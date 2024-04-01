import { supabase } from "../../utils/supabase"

async function updateMyBooks(myBooksNew: string) {
	const { data, error } = await supabase.auth.updateUser({
		data: { myBooks: myBooksNew },
	})
}
export default updateMyBooks
