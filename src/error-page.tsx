import { useRouteError } from 'react-router-dom'
export default function ErrorPage() {
	type Error = {
		statusText: string
		message: string
		data: string
	}

	const error: Error = useRouteError() //as object
	console.error(error)
	console.log(typeof error) // object

	return (
		<div id="error-page">
			<h1>Aiiii</h1>
			<h2>Error occurred, sad!</h2>
			<p>
				<i>
					{error.statusText || error.message}
					<p>
						Detailed...
						<br />
						{error.data}
					</p>
				</i>
			</p>
		</div>
	)
}
