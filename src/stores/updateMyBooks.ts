import { supabase } from "../../utils/supabase"

async function updateMyBooks(myBooksNew: string) {
	const { data, error } = await supabase.auth.updateUser({
		data: { myBooks: myBooksNew },
	})
	if (!error) console.log('updated', data.user.user_metadata.screenname, data.user.user_metadata.myBooks, 'si')
	else console.log('error updating mybooks:', error)
}
export default updateMyBooks
