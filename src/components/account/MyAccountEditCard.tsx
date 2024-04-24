import useCardRotate from '../../hooks/useCardRotate'
import { AppContext } from '../../App'
import { useContext } from 'react'
import { supabase } from '../../../utils/supabase'

export default function MyAccountEditCard() {
	const { see } = useCardRotate()
	const { username, setUsername, usermail, setUsermail } = useContext(AppContext)

	function afterSbUpdate(name: string, mail: string) {
		setUsername(name)
		setUsermail(mail)
		see()
	}

	const updateSbUser = async (form_username: string, form_usermail: string, form_userpass: string) => {
		if (form_userpass !== '') {
			const { data, error } = await supabase.auth.updateUser({
				email: form_usermail,
				password: form_userpass,
				data: { screenname: form_username },
			})
			if (error) console.log('Error updating user:', error)
			else {
				console.log('adata', data)
				afterSbUpdate(form_username, form_usermail)
			}
		} else {
			const { data, error } = await supabase.auth.updateUser({
				email: form_userpass,
				data: { screenname: form_username },
			})
			if (error) console.log('Error updating user:', error)
			else {
				console.log('bdata', data)
				afterSbUpdate(form_username, form_usermail)
			}
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form_username: string = e.currentTarget.account_screenname.value.trim()
		const form_usermail: string = e.currentTarget.account_email.value.trim()
		const form_userpass: string = e.currentTarget.account_password.value.trim()
		updateSbUser(form_username, form_usermail, form_userpass)
	}

	return (
		<>
			<div className="card">
				<header>My account</header>
				<main>
					<form onSubmit={handleSubmit}>
						<label>Screen name</label>
						<input type="text" id="account_screenname" name="account_screenname" defaultValue={username} />
						<label htmlFor="account_email">Email address</label>
						<input type="email" id="account_email" name="account_email" defaultValue={usermail} />
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
