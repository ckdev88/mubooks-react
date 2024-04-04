import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserLogout from '../../stores/UserLogout'

export default function UserLogoutPage() {
	const navigate = useNavigate()
	async function processLogout() {
		UserLogout()
		// TODO: for now we assume there are no errors... this will need to change
		setTimeout(() => {
			navigate('/account/login')
		}, 800)
	}
	useEffect(() => { processLogout() }, [])

	return (
		<>
			<h1>Logging out.</h1>
			<p>
				Redirecting to login page...
			</p>
		</>
	)
}
