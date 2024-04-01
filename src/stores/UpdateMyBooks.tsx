import { supabase } from "../../utils/supabase"

const UpdateMyBooks = async (myBooks) => {
	const myBooksNew = JSON.stringify(myBooks)
	localStorage.setItem('MyBooks', myBooksNew)
	// TODO: update global state (setUserMyBooks)

	// update database
	const { data, error } = await supabase.auth.updateUser({
		data: { myBooks: myBooksNew },
	})
}
export default UpdateMyBooks
