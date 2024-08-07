import { Link } from 'react-router-dom'
import FavoritesItems from './FavoritesItems'

export default function Favorites() {
	return (
		<>
			<article className="adder">
				<Link to="/favorites">
					<header className="adder-header">
						Mu Favorites<span>›</span>
					</header>
				</Link>
				<FavoritesItems page='dashboard' />
			</article>
		</>
	)
}
