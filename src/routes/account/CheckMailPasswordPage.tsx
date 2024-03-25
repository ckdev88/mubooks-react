// TODO: design & copywrite confirmation email
// TODO: design & copywrite password reset email
// TODO: check global state of auth

const CheckMailPasswordPage = () => {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const recipientAddress = urlParams.get('addr')
				/* You should receive an email on <strong><u>{recipientAddress}</u></strong> containing a link to verify your account, click it. */
	return (
		<>
			<h1>Check your email</h1>
			<p>
				You should receive an email on <strong><u>{recipientAddress}</u></strong> containing a link to reset your password, click it.</p>
		</>
	)
}
export default CheckMailPasswordPage
