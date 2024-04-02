import { supabase } from "../../utils/supabase"

const UpdateMyBooks = (myBooksNew: string) => {
	localStorage.setItem('MyBooks', myBooksNew)
	async function executeFn(myBooksNew:string) {
		const { data, error } = await supabase.auth.updateUser({
			data: { myBooks: myBooksNew },
		})
	}
	executeFn(myBooksNew)
}
export default UpdateMyBooks
