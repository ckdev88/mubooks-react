import { supabase } from "../../utils/supabase"
import UserUpdate from "./UserUpdate"
import { useNavigate } from "react-router-dom"
const UserLogin = async (user) => {
	// const navigate=useNavigate()
	let { data, error } = await supabase.auth.signInWithPassword({
		email: user.email,
		password: user.password
	})
	if (error)
		console.log('error:', error) // TODO: use error message to show user
	else {
		// sync state met localstorage
		console.log('logged in: ', data)

// navigate('/dashboard')

		// UserUpdate() // nodig?

		// if (data.user !== null) {
		// 	setUserIsLoggedIn(true)
		// 	setUsername(data.user.user_metadata.screenname)
		// 	setUsermail(data.user.email)
		// 	localStorage.setItem('MyBooks', data.user.user_metadata.myBooks)
		// 	setUserMyBooks(data.user?.user_metadata.myBooks)
		// 	// console.log('logged in, data.user.user_metadata.myBooks:',data.user.user_metadata.myBooks)
		// 	// if(data.user.user_metadata.myBooks!=='[]'){ // wipe de data for now

		// 	// UpdateMyBooks('[]')			
		// 	// 			console.log('wiped?' ,data.user.user_metadata.myBooks)
		// 	// }
		// 	navigate('/dashboard')
		// }
		return { error, data }
	}
}
export default UserLogin
