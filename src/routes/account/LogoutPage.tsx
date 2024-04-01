import { useContext, useEffect } from 'react'
import { supabase } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { AuthError } from '@supabase/supabase-js'

export default function LogoutPage() {
	sessionStorage.clear()
	const { setUsername, setUserIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()

	async function logoutAccount(): Promise<AuthError | undefined> {
		const { error } = await supabase.auth.signOut()
		if (error === null) {
			setUsername('')
			setUserIsLoggedIn(false)
			sessionStorage.clear()
			navigate('/account/login')
		} else {
			return error
		}
	}

	return (
		<>
			<h1>Logging out...</h1>
			<p>
				{useEffect(() => {
					logoutAccount()
				}, [])}
			</p>
		</>
	)
}
