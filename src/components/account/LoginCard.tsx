import { useNavigate } from 'react-router-dom'
import useCardRotate from '../../hooks/useCardRotate'
// import UpdateMyBooks from '../../stores/UpdateMyBooks' // TODO: update state of mubooks
// import { localStorageKey, supabase } from '../../../utils/supabase'
import UserLogin from '../../stores/UserLogin'
import { useContext } from "react"
import { AppContext } from '../../App'

const LoginCard = () => {
	const navigate = useNavigate()
	const { setUsername } = useContext(AppContext)
	// this is probably redundant, keep an eye on root.tsx for this, later abstract is away in
	// separate effect/composable/global state.
	async function processLoginForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formInput: LoginFormInput = event.target
		// const formData = new FormData(event.target)
		/* still not really seeing the added value of this "FormData" */
		// formData.get('loginemail') would return the same as: event.target.loginemail.value
		const user: User = {
			email: formInput.loginemail.value,
			password: formInput.loginpassword.value,
		}
		const login = await UserLogin(user)
		setUsername(login?.data.user?.user_metadata.screenname)
		console.log('user data (logincard):', login?.data)
		if (login?.error === null) navigate('/dashboard')
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
