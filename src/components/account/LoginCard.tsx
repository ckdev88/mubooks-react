import { useNavigate } from 'react-router-dom'
import { localStorageKey, supabase } from '../../../utils/supabase'
import useCardRotate from '../../hooks/useCardRotate'
import { useContext } from 'react'
import { AppContext } from '../../App'

const LoginCard = () => {
	// this is probably redundant, keep an eye on root.tsx for this, later abstract is away in
	// separate effect/composable/global state.

	function processLoginForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formInput: LoginFormInput = event.target
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
			options: {
				data: {
					myBooks:""
				}
			}
		})
		if (error)
			console.log(error) // TODO: use error message to show user
		else {
			if (data.user !== null) {
				setUserIsLoggedIn(true)
				setUsername(data.user.user_metadata.screenname)
				setUsermail(data.user.email)
				localStorage.setItem('MyBooks', data.user.user_metadata.myBooks)
				setUserMyBooks(data.user?.user_metadata.myBooks)
				navigate('/dashboard')
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
