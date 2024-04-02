import useCardRotate from '../../hooks/useCardRotate'
import UserSignup from '../../stores/UserSignup'
import { useNavigate } from 'react-router-dom'

export default function SignupCard() {
	const navigate = useNavigate()
	const { login } = useCardRotate()

	async function processSignupForm(event: any) {
		event.preventDefault()
		const user: User = {
			email: event.target.email.value,
			screenname: event.target.screenname.value,
			password: event.target.password.value,
		}
		const isSignedUp = UserSignup(user)
		if ((await isSignedUp).success === true) {
			navigate(`/account/new?addr=${user.email}`) // beetje unsafe dit, beter via sessie of api
		}
	}

	return (
		<>
			<article className="card" id="card-signup">
				<header>Create an account</header>
				<main>
					<form onSubmit={processSignupForm}>
						<label htmlFor="screenname">Screen name</label>
						<input type="text" id="signup-screenname" name="screenname" />
						<label htmlFor="email">Email address: *</label>
						<input type="email" id="signup-email" name="email" required />
						<label htmlFor="password">Password: *</label>
						<input type="password" id="signup-password" name="password" required />
						<button>Create</button>
					</form>
				</main>
				<footer className="content-right">
					<a onClick={login}>Already have an account</a>
				</footer>
			</article>
		</>
	)
}
