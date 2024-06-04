import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { localStorageKey } from '../../utils/supabase'
import { useContext } from 'react'
import { AppContext } from '../App'

const RootPage = () => {
	const { setUsermail, setUserIsLoggedIn, userIsLoggedIn } = useContext(AppContext)
	let loggedin: boolean = false
	const navigate = useNavigate()

	const userInLs = JSON.parse(localStorage.getItem(localStorageKey) as string)
	console.log('userInLs:',userInLs)
	if (userInLs?.user?.aud === 'authenticated') {
		loggedin = true
		setUserIsLoggedIn(true)
	}

	// TODO: cause not being able to fix resetpassword page?
	console.log('zijn we hier?')
	let navigateTo: string = '/account/login'
	if (loggedin) navigateTo = '/dashboard'

	useEffect(() => {
		if (loggedin) {
			console.log('effect logged in in RootPage')
			setUsermail(userInLs.user.email)
			navigate(navigateTo)
		} else {
			if (userIsLoggedIn) {
				console.log('we zijn logged in zegt userIsLoggedIn')
				setUserIsLoggedIn(true)
			} else console.log('oh toch niet')
			console.log('effect logged in else in RootPage')
			console.log('wacht even...')
			// navigate(navigateTo)
		}
	}, [loggedin, navigateTo, navigate, setUsermail, userInLs])

	return (
		<>
			<main id="main" className="textwrapper">
				<div className="textwrapper">
					Redirecting to wherever you should be right now... <br />
					<Link to={navigateTo}>Click here</Link> if you're not redirected automatically. or{' '}
					<a href="https://ckdev88.github.io/mubooks/#/dashboard">dashboard</a>
				</div>
			</main>
		</>
	)
}

export default RootPage
