import { supabase } from "../../utils/supabase"

const UpdateMyBooks = (myBooksNew: Books) => {
	// TODO: improve type safety
	localStorage.setItem('MyBooks', myBooksNew)
	async function executeFn(myBooksNew) {
		const { data, error } = await supabase.auth.updateUser({
			data: { myBooks: myBooksNew },
		})
	}
	executeFn(myBooksNew)
}
export default UpdateMyBooks
