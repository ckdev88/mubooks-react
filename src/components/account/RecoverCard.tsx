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
	// <style scoped>
	// .icon-forgot-password {
	// 	height: 4rem;
	// 	width: 4rem;
	// 	background: transparent;
	// 	margin: 0 auto;
	// 	box-sizing: border-box;
	// }
	// .icon-forgot-password div {
	// 	box-sizing: border-box;
	// 	border-style: solid;
	// 	border-color: black;
	// }
	// .head {
	// 	border-width: 0.35rem;
	// 	border-radius: 50%;
	// 	width: 100%;
	// 	height: 100%;
	// 	position: relative;
	// 	box-sizing: border-box;
	// }
	// .card .recover-icon {
	// 	display: block;
	// 	width: auto;
	// 	margin: 0 auto;
	// }
	// </style>
}
export default RecoverCard
