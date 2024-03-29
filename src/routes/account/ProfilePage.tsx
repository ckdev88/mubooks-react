import { useEffect } from 'react'
import setDraaideurHeight from '../../hooks/setDraaideurHeight'
import MyAccountCard from '../../components/account/MyAccountCard'
import MyAccountEditCard from '../../components/account/MyAccountEditCard'
const ProfilePage = () => {
	useEffect(() => {
		setDraaideurHeight()
	}, [])
	return (
		<>
			<div className="cards-draaideur" id="cards-draaideur">
				<div className="axis">
					<MyAccountCard />
					<MyAccountEditCard />
				</div>
			</div>
		</>
	)
}
export default ProfilePage
