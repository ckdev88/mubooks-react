// @ts-nocheck
import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
	const error = useRouteError();
	console.error(error)
	return (
		<div id='error-page'>
			<h1>Aiiii</h1>
			<h2>Error occurred, sad!</h2>
			<p>Error description: <i>{error.statusText || error.message}</i></p>
		</div>
	)
}
