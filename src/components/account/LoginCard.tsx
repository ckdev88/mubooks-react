// @ts-nocheck
export default function LoginCard() {
	return (
		<>
			<article className="card" id="card-login">
				<header>Log in</header>
				<main>
					<form>
					<label for="email">Email</label>
					<input type="email" id="login-email"  required /> 
					<label for="password">Password</label>
					<input type="password" id="login-password"  /> 
					<button>Log in</button>
				</form>
			</main>
			<footer>
				<a onClick="useCardRotate('login', 'recover')">Forgot password</a>
				<a onClick="useCardRotate('login', 'signup')">New here? Join now.</a>
			</footer>
		</article>
	</>
	)
}
