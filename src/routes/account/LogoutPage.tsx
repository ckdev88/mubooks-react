import { useEffect } from 'react'
import { supabase } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'
const toLoginIfLogout=()=>{
	const navigate=useNavigate()

	useEffect(() => {
		navigate('/account/login')
	})
}
let { error } = await supabase.auth.signOut()
export default function LogoutPage() {
	let msg: string
	if (error) msg = error.message
	else {
		msg = '... succesful'
		toLoginIfLogout()
	}
	return (
		<>
			<h1>Logging out...</h1>
			<p>{msg}</p>
		</>
	)
}
