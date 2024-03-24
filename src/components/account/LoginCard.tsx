import { useState } from 'react'
import { supabase } from '../../../utils/supabase'
import useCardRotate from '../../hooks/useCardRotate'

const LoginCard = () => {

	// this is probably redundant, keep an eye on root.tsx for this, later abstract is away in
	// separate effect/composable/global state.
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginAccount() {
		console.log('login account')
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		})
		if (error) console.log(error)
		else {
			const authStore = {
				setLoginStatus: 123,
				username: '',
			}
			// TODO: set session & global state
			// TODO: redirect to dashboard page
			authStore.setLoginStatus = 1234
			authStore.username = 'asdasd'
		}
	}
	const { recover, signup } = useCardRotate()
	return (
		<>
			<article className="card" id="card-login">
				<main>
					<header>Log in</header>
					<form onSubmit={loginAccount}>
						<label htmlFor="email">Email</label>
						<input type="email" id="login-email" required onKeyUp={(event) => setEmail(event)} />
						<label htmlFor="password">Password</label>
						<input type="password" id="login-password" onKeyUp={(event) => setPassword(event)} />
						<button>Log in</button>
					</form>
				</main>
				<footer>
					<a onClick={recover}>Forgot password</a>
					<a onClick={signup}>New here? Join now.</a>
				</footer>
			</article>
		</>
	)
}
export default LoginCard
