// const router = useRouter()
import useCardRotate from '../../hooks/useCardRotate'
import { Link } from 'react-router-dom'
// import { supabase } from '../../../utils/supabase'

// onBeforeMount(() => {
// 	showCurrentUser()
// })
export default function MyAccountCard() {
	const { change } = useCardRotate()
	// const userdata = async()=> {

	// TODO: needs proper fix, not dirty like this...  pinia, store, login
	// if (authStore.status !== true) {
	// 	const { data, error } = await supabase.auth.getUser()
	// 	if (error) {
	// 		// router.push({ name: 'login' })
	// 		console.log('error:', error)
	// 	} else {
	// 	console.log('data',data)
	// 		return data
	// }
	// 		authStore.email = data.user.email
	// 		authStore.screenname = data.user.user_metadata.screenname
	// 		authStore.username = data.user.email
	// 		authStore.status = true
	// 		authStore.uid = data.user.id
	// 	}
	// }
	// TODO: add screen name
	// TODO: add possibilities to modify data

	return (
		<div className="card">
			<header>My account</header>
			<main>
				<dl>
					<dt>Screen name:</dt>
					<dd>asdfasdf{/* authStore.screenname */}</dd>
					<dt>Email address</dt>
					<dd>fdsadfau{/*authStore.email*/}</dd>
					<dt>Password</dt>
					<dd>******</dd>
				</dl>
				<button onClick={change}>change</button>
			</main>
			<footer>
				<Link to="/dashboard">Back to dashboard</Link>
			</footer>
		</div>
	)
}
