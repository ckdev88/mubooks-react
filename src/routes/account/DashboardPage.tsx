import { useContext } from 'react'
import QuoteCard from '../../components/QuoteCard'
import Reading from '../../components/dashboard/Reading'
import Saved from '../../components/dashboard/Saved'
import Finished from '../../components/dashboard/Finished'
import Favorites from '../../components/dashboard/Favorites'
import Wishlist from '../../components/dashboard/Wishlist'
import { AppContext } from '../../App'

const DashboardPage = () => {
	const { username } = useContext(AppContext)

	return (
		<>
			<div className="textwrapper">
				<h1>Hi, {username}</h1>
				<p>
					MuBOOKS is your journal for your books. <br />
					<br />
					Let's get started!
				</p>
			</div>
			<QuoteCard />
			<Reading />
			<Wishlist />
			<Favorites />
			<Finished />
			<Saved />
		</>
	)
}
export default DashboardPage
/* <Tropes /> <Stats /> <Explore /> */
