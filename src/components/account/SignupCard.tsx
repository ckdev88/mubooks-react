// import { Router } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
// import {  useState } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
export default function SignupCard() {
	// const [user, setUser] = useState<{}>({})
	const { login } = useCardRotate()

	type User = {
		email: string
		screenname: string
		password: string
	}

	function processSignupForm(event: any) {
		event.preventDefault()
		const user: User = {
			email: event.target.email.value,
			screenname: event.target.screenname.value,
			password: event.target.password.value,
		}
		createAccount(user)
	}
	const navigate = useNavigate()
	async function createAccount(user: User) {
		const { data, error } = await supabase.auth.signUp({
			email: user.email,
			password: user.password,
			options: {
				data: { screenname: user.screenname },
			},
		})
		if (error) {
			console.log(error)
		} else {
			console.log('adding user:', data)
			console.log('Account created, referring...')
			// TODO: redirect to check mail- page
			navigate(`/account/new?addr=${user.email}`) // beetje unsafe dit, beter via sessie of api
			// key zodat max. 1 (browser)sessie 1 account kan maken
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
