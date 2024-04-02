import { useContext, useEffect, useState } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'

export default function MyAccountCard() {
	const { change } = useCardRotate()
	const navigate = useNavigate()
	const { username, usermail } = useContext(AppContext)
	const [sbUsermail, setSbUsermail] = useState(usermail)
	const [sbUsername, setSbUsername] = useState(username)

	useEffect(() => {
		userdata()
	}, [])

	const userdata = async () => {
		const { data, error } = await supabase.auth.getUser()
		if (error) {
			console.log('error updating userdata',error)
			// navigate('/account/login')
		} else {
			setSbUsermail(data.user.email)
			setSbUsername(data.user.user_metadata?.screenname)
		}
	}

	return (
		<div className="card">
			<header>My account</header>
			<main>
				<dl>
					<dt>Screen name</dt>
					<dd>{sbUsername}</dd>
					<dt>Email address</dt>
					<dd>{sbUsermail}</dd>
					<dt>Password</dt>
					<dd>******</dd>
				</dl>
				<button onClick={change}>change</button>
			</main>
			<footer>
				<Link to="/dashboard">Back to dashboard</Link>
			</footer>
		</div>
	)
}
