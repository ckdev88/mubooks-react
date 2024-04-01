import useCardRotate from '../../hooks/useCardRotate'
import { supabase } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { useEffect, useState, useContext } from 'react'

export default function MyAccountEditCard() {
	const { see } = useCardRotate()
	const navigate = useNavigate()
	const { username, setUsername, usermail, setUsermail, userIsLoggedIn } = useContext(AppContext)
	const [sbUsermail, setSbUsermail] = useState<string>(usermail)
	const [sbUsername, setSbUsername] = useState<string>(username)

	useEffect(() => {
		userdata()
	}, [])

	const userdata = async () => {
		const { data, error } = await supabase.auth.getUser()
		if (error) {
			navigate('/account/login')
		} else {
			setSbUsermail(data.user.email)
			setSbUsername(data.user.user_metadata?.screenname)
		}
	}
	function afterUpdateSb(name:string, mail:string) {
		setUsername(name)
		setUsermail(mail)
		setSbUsername(name)
		setSbUsermail(mail)
		see()
	}
	async function updateUser(form_username: string, form_usermail: string, form_userpass: string) {
		if (form_userpass !== '') {
			// TODO: ugly conditional, make nice
			const { data, error } = await supabase.auth.updateUser({
				email: form_usermail,
				password: form_userpass,
				data: { screenname: form_username },
			})
			// TODO: use error to show to user
			if (!error) afterUpdateSb(form_username, form_usermail)
		} else {
			const { data, error } = await supabase.auth.updateUser({
				email: form_usermail,
				data: { screenname: form_username },
			})
			// TODO: use error to show to user
			if (!error) afterUpdateSb(form_username, form_usermail)
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formInput = e.target as HTMLInputElement

		const form_username: string = formInput.account_screenname.value.trim()
		const form_usermail: string = formInput.account_email.value.trim()
		const form_userpass: string = formInput.account_password.value.trim()

		updateUser(form_username, form_usermail, form_userpass)
	}

	return (
		<>
			<div className="card">
				<header>My account</header>
				<main>
					<form onSubmit={handleSubmit}>
						<label>Screen name</label>
						<input
							type="text"
							id="account_screenname"
							name="account_screenname"
							defaultValue={sbUsername}
						/>
						<label htmlFor="account_email">Email address</label>
						<input type="email" id="account_email" name="account_email" defaultValue={sbUsermail} />
						<label htmlFor="account_password">Password (leave empty to keep current)</label>
						<input type="password" id="account_password" name="account_password" defaultValue="" />
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
