import { supabase } from "../../utils/supabase"

const UserSignup = async (user: User) => {
	console.log('create account from SignupCard.tsx')
	const { data, error } = await supabase.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: { screenname: user.screenname, MyBooks: '[]' },
		},
	})
	let success: boolean
	if (error) success = false // TODO: use error  to show
	else {
		console.log('user signed up:', data)
		success = true
	}
	return { success }
}
export default UserSignup
