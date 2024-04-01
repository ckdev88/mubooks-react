import { supabase } from "../../utils/supabase"

const UpdateMyBooks = (myBooks:Books) => {
	const myBooksNew:string = JSON.stringify(myBooks)

	localStorage.setItem('MyBooks', myBooksNew)
	async function executeFn(myBooksNew) {
		const { data, error } = await supabase.auth.updateUser({
			data: { myBooks: myBooksNew },
		})
	}
	executeFn(myBooksNew)
}
export default UpdateMyBooks
