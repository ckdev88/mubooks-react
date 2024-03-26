import WishlistItems from './WishlistItems'
//<header onClick={$router.push({ name: 'wishlist' })}>
export default function Wistlist() {
	return (
		<>
			<article className="adder">
				<header>
					Mu Wishlist<span>›</span>
				</header>
				<WishlistItems />
			</article>
		</>
	)
}
