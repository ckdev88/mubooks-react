import { useRouteError } from 'react-router-dom'
export default function ErrorPage() {
	type Error = {
		statusText: string
		message: string
		data: string
	}

	const error: Error = useRouteError() //as object

	return (
		<div id="error-page">
			<h1>Aiiii</h1>
			<h2>Error occurred, sad!</h2>
			<p>
				<i>
					{error.statusText || error.message}
					<br/><br/>
						Detailed...
						<br />
						{error.data}
				</i>
			</p>
		</div>
	)
}
