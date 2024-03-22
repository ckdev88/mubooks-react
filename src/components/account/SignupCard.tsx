// @ts-nocheck
import { Router } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
import { useState } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
export default function SignupCard() {
	const [user, setUser] = useState<{}>({})
	const { login } = useCardRotate()

	// const f = reactive({
	// 	screenname: '',
	// 	email: '',
	// 	password: ''
	// })

	async function createAccount() {
		console.log('create account')
		console.log('email,password:', f.email, f.password)
		const { data, error } = await supabase.auth.signUp({
			email: f.email,
			password: f.password,
			options: {
				data: { screenname: f.screenname },
			},
		})
		if (error) {
			console.log(error)
		} else {
			console.log('adding user:', data)

			console.log(' user:', data.user.id)
			authStore.setEmail(f.email)
			authStore.setScreenname(f.screenname)
			authStore.setUid(data.user.id)
			console.log('Account created, referring...')
			router.push({ name: 'checkmail' })
		}
	}

	return (
		<>
			<article className="card" id="card-signup">
				<header>Create an account</header>
				<main>
					<form>
						<label htmlFor="screenname">Screen name</label>
						<input type="text" id="signup-screenname" v-model="f.screenname" />
						<label htmlFor="email">Email address: *</label>
						<input type="email" id="signup-email" v-model="f.email" required />
						<label htmlFor="password">Password: *</label>
						<input type="password" id="signup-password" v-model="f.password" required />
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
