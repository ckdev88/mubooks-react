import  { useRef } from 'react'

export default function Search() {
	const form=useRef(null)
	function publish(event): void {
		event.preventDefault()
		console.log(form)
		let formData = new FormData(form.current)

		// console.log('asdasdas')
		// console.log(event.target.content.value)
		const content = formData.get('content')
		console.log(content)
		// const button = formData.get('button')
		// console.log(`'${content}' was published with the '${button}' button`)
	}

	// function save(formData) {
	// 	const content = formData.get('content')
	// 	console.log(`Your draft of '${content}' has been saved!`)
	// }

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
