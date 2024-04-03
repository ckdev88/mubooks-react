import { supabase } from '../../utils/supabase'

const UpdateMyBooks = async (myBooksNew: string) => {
	localStorage.setItem('MyBooks', myBooksNew)
	await supabase.auth.updateUser({
		data: { MyBooks: myBooksNew },
	})
}
export default UpdateMyBooks
