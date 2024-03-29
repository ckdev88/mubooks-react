import { useEffect } from 'react'
import setDraaideurHeight from '../../hooks/setDraaideurHeight'
import MyAccountCard from '../../components/account/MyAccountCard'
import MyAccountEditCard from '../../components/account/MyAccountEditCard'
const ProfilePage = () => {
	// useEffect(() => setDraaideurHeight(), [])
	// import { supabase } from '../../clients/supabase'
	// import { useAuthStore } from '../../stores/AuthStore'
	// const authStore = useAuthStore()
	// import setDraaideurHeight from '../../composables/setDraaideurHeight'
	// import MyAccountEditCard from '../../components/account/MyAccountEditCard.vue'
	//
	// </script>
	// <template>
	// 	<div class="cards-draaideur">
	// 		<div class="axis">
	// 			<MyAccountCard />
	// 			<MyAccountEditCard />
	// 		</div>
	// 	</div>
	// </template>

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
