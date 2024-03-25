// @ts-nocheck
import useCardRotate from '../../hooks/useCardRotate'
import { supabase } from '../../../utils/supabase'

const RecoverCard = () => {
	const { login } = useCardRotate()
	function processRecoverForm(event) {
		event.preventDefault()
		console.log('doe iets')
		console.log('recover', event.target.email.value)
	}
	async function recoverAccount(email) {
		console.log('recovering..')
		let { data, error } = await supabase.auth.resetPasswordForEmail(email)
		if (error) console.log(error)
		else console.log('check email!')
	}
	return (
		<>
			<article className="card" id="card-recover">
				<img src="/img/recover-icon.png" width="82" height="82" alt="" className="recover-icon" />
				<header>Forgot your password? Don't worry. Let's get it back.</header>
				<main>
					<form onSubmit={processRecoverForm}>
						<label htmlFor="recover-email">Email address: *</label>
						<input type="email" id="recover-email" name="email" required />
						<p>We'll send a link to this email if it matches an existing MuBOOKS account.</p>
						<button type="submit">Next</button>
					</form>
				</main>
				<footer>
					<button onClick={login} className="alt">
						Back
					</button>
				</footer>
			</article>
		</>
	)
}
export default RecoverCard
