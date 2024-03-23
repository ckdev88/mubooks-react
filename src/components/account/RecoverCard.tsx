import { useRef } from 'react'
import useCardRotate from '../../hooks/useCardRotate'

const RecoverCard = () => {
	const email = useRef('')
	const { login } = useCardRotate()
	return (
		<>
			<article className="card" id="card-recover">
				<img src="/img/recover-icon.png" width="82" height="82" alt="" className="recover-icon" />
				<header>Forgot your password? Don't worry. Let's get it back.</header>
				<main>
					<form>
						<label htmlFor="recover-email">Email address: *</label>
						<input type="email" id="recover-email" v-model="email" required />
						<p>We'll send a link to this email if it matches an existing MuBOOKS account.</p>
						<button>Next</button>
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
