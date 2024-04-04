import { useNavigate } from 'react-router-dom'
import useCardRotate from '../../hooks/useCardRotate'
import UserLogin from '../../stores/UserLogin'
import { useContext, useEffect } from "react"
import { AppContext } from '../../App'

const LoginCard = () => {
	const navigate = useNavigate()
	const { setUsername, setUserMyBooks, userMyBooks } = useContext(AppContext)

	async function processLoginForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formInput: LoginFormInput = event.target
		const user: User = {
			email: formInput.loginemail.value,
			password: formInput.loginpassword.value,
		}
		const login = await UserLogin(user as User)
		if (login?.data) {
			setUsername(login?.data.user?.user_metadata.screenname)
			localStorage.setItem('MyBooks', login?.data.user?.user_metadata.MyBooks)
			setUserMyBooks(localStorage.getItem('MyBooks'))
			setTimeout(() => {
				navigate('/dashboard')
			}, 800)
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
