import { useContext, useEffect } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'

export default function MyAccountCard() {
	const { change } = useCardRotate()
	const { username, usermail, setUsermail, setUsername } = useContext(AppContext)

	useEffect(() => {
		userdata()
	}, [])

	const userdata = async () => {
		const { data, error } = await supabase.auth.getUser()
		if (error) {
			console.log('error updating userdata', error)
		} else {
			if (data.user.email) setUsermail(data.user.email)
			setUsername(data.user.user_metadata?.screenname)
		}
	}

	return (
		<div className="card">
			<header>My account</header>
			<main>
				<dl>
					<dt>Screen name</dt>
					<dd>{username}</dd>
					<dt>Email address</dt>
					<dd>{usermail}</dd>
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
