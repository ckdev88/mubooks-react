import { useContext, useEffect } from 'react'
import { supabase } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { AuthError } from '@supabase/supabase-js'

export default function LogoutPage() {
	const { setUsername, setUserIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()

	// async function logoutAccount(): Promise<AuthError | undefined> {
	const { error } = async () => {
		await supabase.auth.signOut()
		if (error === null) {
			// setUsername('')
			setUserIsLoggedIn(false)
			navigate('/account/login')
		} else {
			return error
		}
	}
	// }

	// {logoutAccount()}
	return (
		<>
			<h1>Logging out...</h1>
			<p>
				One moment..
			</p>
		</>
	)
}
