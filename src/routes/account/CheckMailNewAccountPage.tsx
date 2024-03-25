// TODO: design & copywrite confirmation email
// TODO: check global state of auth

const CheckMailNewAccountPage = () => {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const recipientAddress = urlParams.get('addr')
	return (
		<>
			<h1>Check your email</h1>
			<p>
				You should receive an email on <strong><u>{recipientAddress}</u></strong> containing a link to verify your account, click it.
			</p>
		</>
	)
}
export default CheckMailNewAccountPage
