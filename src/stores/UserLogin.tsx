import { supabase } from "../../utils/supabase"
const UserLogin = async (user: User) => { 
	let { data, error } = await supabase.auth.signInWithPassword({
		email: user.email,
		password: user.password
	})
	if (error)
		console.log('error:', error) // TODO: use error message to show user
	else {
		return { error, data }
	}
}
export default UserLogin
