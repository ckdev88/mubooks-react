import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QuoteCard from '../../components/QuoteCard'
import Reading from '../../components/dashboard/Reading'
import Saved from '../../components/dashboard/Saved'
import Favorites from '../../components/dashboard/Favorites'
import Tropes from '../../components/dashboard/Tropes'
import Stats from '../../components/dashboard/Stats'
import Explore from '../../components/dashboard/Explore'
import { AppContext } from '../../App'

const DashboardPage = () => {
	const { username, userIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()
	useEffect(() => {
		if (userIsLoggedIn === false) navigate('/account/login')
	}, [])

	return (
		<>
			<h1>Hi, {username}</h1>
			<p>
				MuBOOKS is your journal for your books. <br />
				<br />
				Let's get started!
			</p>
			<QuoteCard />
			<Reading />
			<Saved />
			<Favorites />

			<Tropes />
			<Stats />
			<Explore />
			<Link to="/account/login">To login page</Link>
			<Link to="/account/logout">Logout</Link>
		</>
	)
}
export default DashboardPage
