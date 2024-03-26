import FavoritesItems from './FavoritesItems'
export default function Favorites() {
	return (
		<>
			<article className="adder">
				<header >
					Mu Favorites<span>›</span>
				</header>
				<FavoritesItems />
			</article>
		</>
	)
}
