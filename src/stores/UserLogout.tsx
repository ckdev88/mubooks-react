import { supabase } from "../../utils/supabase"
const UserLogout = async () => {
	let { error } = await supabase.auth.signOut()
	if (error === null) {
		console.log('logged out')
	} else {
		return error
	}
	return error
}
export default UserLogout
