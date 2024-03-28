import { useEffect, useContext } from 'react'
import { localStorageKey, supabase } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'
import LoginCard from '../../components/account/LoginCard'
import SignupCard from '../../components/account/SignupCard'
import RecoverCard from '../../components/account/RecoverCard'
import setDraaideurHeight from '../../hooks/setDraaideurHeight'
// import { AppContext } from '../../App'

// TODO: 90% van dit kan wss weg

export default function Login() {
	const navigate = useNavigate()
	async function getUserSession() {
		const { data: session } = await supabase.auth.getSession()
		const user = session?.user
		if (user) return user
		else return false
	}
	// async function toDashboardIfLoggedin(user) {
	// 	if (user) {
	// 		console.log('user from login.tsx', user, 'redirect naar dashboard')
	// 		const arg='loggedin=true'
	// 		useEffect(() => {
	// 	 	navigate('/dashboard')
	// 		})
	// 	}
	// }
	// const user = getUserSession()
	// console.log('login.txt after getUserSession', user)
	// toDashboardIfLoggedin(user)
	// function toProfile(): void {
	// 	console.log('click toProfile')
	// 	const navigate = useNavigate() // TODO: invalid hook call
	// 	navigate('/profile')
	// }

	useEffect(() => setDraaideurHeight(), []) // apply "composable" when DOM is loaded

	return (
		<>
			<div id="welcome-logo" style={{ marginBottom: 1 + 'rem' }}>
				<h1 style={{ textAlign: 'center' }}>MuBooks</h1>
				<img
					id="welcome-logo-img"
					src="/img/logo.svg"
					style={{
						maxWidth: '33%',
						display: 'block',
						margin: '0 auto',
						position: 'relative',
						zIndex: 2,
					}}
				/>
			</div>
			<div id="cards-draaideur" className="cards-draaideur">
				<div className="axis">
					<LoginCard />
					<SignupCard />
					<RecoverCard />
					<button onClick={() => toProfile()}>To profile</button>
				</div>
			</div>
			<br style={{ clear: 'both' }} />
			<div className="hidden">
				<br />
				<button onClick={() => toProfile}>To profile</button>
				<br style={{ clear: 'both' }} />
				Or...
				<br />
				Use google auth, apple id, etc
			</div>
		</>
	)
}
