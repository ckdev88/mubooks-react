// @ts-nocheck
import { Router } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
import { useRef, useState } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
export default function SignupCard() {
	const [user, setUser] = useState<{}>({})
	const { login } = useCardRotate()

	function processSignupForm(event) {
		event.preventDefault()
		const user = {
			email: event.target.email.value,
			screenname: event.target.screenname.value,
			password: event.target.password.value,
		}
		createAccount(user)
	}
	async function createAccount(user) {
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
			console.log(' user:', data.user.id)
			console.log('Account created, referring...')
			router.push({ name: 'checkmail' })
			// TODO: set session & global state
			// authStore.setEmail(f.email)
			// authStore.setScreenname(f.screenname)
			// authStore.setUid(data.user.id)
			//
			// TODO: redirect to login page
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
