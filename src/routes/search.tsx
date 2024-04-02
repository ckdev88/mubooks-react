import { useRef } from 'react'

export default function Search() {
	const form = useRef(null)
	function publish(event): void {
		event.preventDefault()
		let formData = new FormData(form.current)
		const content = formData.get('content')
	}

	return (
		<form onSubmit={publish} ref={form}>
			<textarea name="content" rows={4} cols={40} />
			<br />
			<button type="submit" name="button" value="submit">
				Publish
			</button>
		</form>
	)
}
