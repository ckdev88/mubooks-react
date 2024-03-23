import useCardRotate from '../../hooks/useCardRotate'
const LoginCard = () => {

	const numm = (inn:number = 3, out = 3) => {
		return inn + out
	}
	const bla = Number(numm)
	console.log(bla)

	const { recover, signup } = useCardRotate()
	return (
		<>
			<article className="card" id="card-login">
				<main>
					<header>Log in</header>
					<form>
						<label htmlFor="email">Email</label>
						<input type="email" id="login-email" required />
						<label htmlFor="password">Password</label>
						<input type="password" id="login-password" />
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
