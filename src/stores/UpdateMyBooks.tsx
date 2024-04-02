import { supabase } from '../../utils/supabase'

const UpdateMyBooks = (myBooksNew: string) => {
	localStorage.setItem('MyBooks', myBooksNew)
	const { data, error } = async () => {
		return await supabase.auth.updateUser({
			data: { myBooks: myBooksNew },
		})
	}
}
export default UpdateMyBooks
