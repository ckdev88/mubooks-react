import { supabase } from "../../utils/supabase"
const UserLogout = async () => {
	// const { setUsername, setUserIsLoggedIn } = useContext(AppContext)
	let { error } = await supabase.auth.signOut()
	if (error === null) {
		console.log('logged out')
	} else {
		return error
	}
	return error
	// setUserIsLoggedIn(false)
}
export default UserLogout
