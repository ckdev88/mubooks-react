import { useState } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'
import Heading from '../ui/Heading'

async function userSignup(user: User) {
	const signup = await supabase.auth.signUp(user)
	return signup
}

export default function SignupCard() {
	const { setUsermail } = useContext(AppContext)
	const navigate = useNavigate()
	const { login } = useCardRotate()
	const [error, setError] = useState('')

	async function processSignupForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const user: User = {
			email: event.currentTarget.email.value,
			screenname: event.currentTarget.screenname.value,
			password: event.currentTarget.password.value,
		}
		const signup = await userSignup(user)

		if (signup.error) setError(signup.error.message)
		else {
			setUsermail(user.email)
			navigate(`/account/new?addr=${user.email}`)
		}
	}

	return (
		<>
			<article className="card" id="card-signup">
				<header>
					<Heading text="Let's create an account" sub="Have your account in a few seconds" />
				</header>
				<main>
					<form onSubmit={processSignupForm}>
						<label htmlFor="signup_screenname">
							<div className="description">Screen name</div>
							<input type="text" id="signup_screenname" name="screenname" autoComplete="off" />
						</label>
						<label htmlFor="signup_email">
							<div className="description">Email address: *</div>
							<input type="email" id="signup_email" name="email" required autoComplete="off" />
						</label>
						<label htmlFor="signup_password">
							<div className="description">Password: *</div>
							<input type="password" id="signup_password" name="password" required autoComplete="off" />
						</label>
						<div className={error !== '' ? 'dblock error' : 'dblock'}>{error}&nbsp;</div>
						<button className="btn-lg">Create account</button>
					</form>
				</main>
				<footer className="content-right">
					<button className="btn-text" onClick={login}>
						I already have an account
					</button>
				</footer>
			</article>
		</>
	)
}
