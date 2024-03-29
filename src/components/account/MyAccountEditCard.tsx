import useCardRotate from '../../hooks/useCardRotate'
import { supabase } from '../../../utils/supabase'

async function loadCurrentUser() {
	const { data, error } = await supabase.auth.getUser()
	// if (error) {
	// 	router.push({ name: 'login' })
	// 	console.log('error:', error)
	// }
	// else {
	// 	authStore.setStatus(true,data.user.user_metadata.screenname,data.user.email,data.user.username,data.user.id)
	// 	}
	// TODO: add screen name
	// TODO: add possibilities to modify data
}

// async function handleSubmit(e) {
// 	e.preventDefault()
// 	// const newscreenname = authStore.screenname
// 	const newscreenname: string = 'testnewscreenname' // TODO: use state or something
// 	const { data, error } = await supabase.auth.updateUser({
// 		data: { screenname: newscreenname },
// 	})
// 	if (error) console.log(error)
// 	else console.log('data:', data)
// 	loadCurrentUser()
// 	useCardRotate()
// }


// onBeforeMount(() => {
loadCurrentUser()
// })

export default function MyAccountEditCard() {
	const { see } = useCardRotate()
	function handleSubmit(e) {
		e.preventDefault()
		console.log('handle is')
		// TODO: form handling
		see()
	}
	const screenname = 'tempscreenname' // TODO: fix
	const email = 'tempemail' // TODO: fix
	return (
		<>
			<div className="card">
				<header>My account</header>
				<main>
					<form onSubmit={handleSubmit}>
						<label>Screen name</label>
						<input type="text" id="account-screenname" />
						<label htmlFor="account-email">Email address</label>
						<input type="email" id="account-email" />
						<label htmlFor="account-password">Password (leave empty to keep current)</label>
						<input type="password" id="account-password" />
						<button>Save and return</button>
					</form>
				</main>
				<footer>
					<a onClick={see}>Return without saving</a>
				</footer>
			</div>
		</>
	)
}
