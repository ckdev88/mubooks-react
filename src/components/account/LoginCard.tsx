import { useNavigate } from 'react-router-dom'
import { localStorageKey, supabase } from '../../../utils/supabase'
import useCardRotate from '../../hooks/useCardRotate'
import { useContext } from 'react'
import { AppContext } from '../../App'

const LoginCard = () => {
	// this is probably redundant, keep an eye on root.tsx for this, later abstract is away in
	// separate effect/composable/global state.
	type User = {
		email: string
		password: string
	}

	function processLoginForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		interface FormInput {
			loginemail: { value: string }
			loginpassword: { value: string }
		}
		const formInput: FormInput = event.target
		// const formData = new FormData(event.target)
		/* still not really seeing the added value of this "FormData" */
		// formData.get('loginemail') would return the same as: event.target.loginemail.value
		const user: User = {
			email: formInput.loginemail.value,
			password: formInput.loginpassword.value,
		}
		loginAccount(user)
	}

	const navigate = useNavigate()

	const { setUsername, setUsermail, setUserIsLoggedIn, setUserMyBooks } = useContext(AppContext)

	async function loginAccount(user: User) {
		let { data, error } = await supabase.auth.signInWithPassword({
			email: user.email,
			password: user.password,
		})
		if (error)
			console.log(error) // TODO: use error message to show user
		else {
			if (data.user !== null) {
				// TODO: set session & global state, just use session saved in localstorage
				setUserIsLoggedIn(true)
				setUsername(data.user.user_metadata.screenname)
				setUsermail(data.user.email)
				setUserMyBooks(data.user?.user_metadata.myBooks)
				navigate('/dashboard')

				// copy localStorage to sessionStorage
				sessionStorage.setItem(localStorageKey, localStorage.getItem(localStorageKey))
			}
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
