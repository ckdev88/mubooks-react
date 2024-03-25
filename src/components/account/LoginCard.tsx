import { supabase } from '../../../utils/supabase'
import useCardRotate from '../../hooks/useCardRotate'

const LoginCard = () => {
	// this is probably redundant, keep an eye on root.tsx for this, later abstract is away in
	// separate effect/composable/global state.
	type User = {
		email: string
		password: string
	}
	function processLoginForm(event: any) {
		event.preventDefault()
		// const formData = new FormData(event.target)
		/* still not really seeing the added value of this "FormData" */
		// formData.get('loginemail') would return the same as: event.target.loginemail.value
		const user:User = {
			email: event.target.loginemail.value,
			password: event.target.loginpassword.value,
		}
		loginAccount(user)
	}

	async function loginAccount(user: User) {
		let { data, error } = await supabase.auth.signInWithPassword({
			email: user.email,
			password: user.password,
		})
		if (error) console.log(error)
		else {
			console.log('logged in!')
			// TODO: set session & global state
			// TODO: redirect to dashboard page
		}
	}
	const { recover, signup } = useCardRotate()

	return (
		<>
			<article className="card" id="card-login">
				<main>
					<header>Log in</header>
					<form onSubmit={processLoginForm}>
						<label htmlFor="login-email">Email</label>
						<input type="email" id="loginemail" name="loginemail" required />
						<label htmlFor="login-password">Password</label>
						<input type="password" id="loginpassword" name="loginpassword" />
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
