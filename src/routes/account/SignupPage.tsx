import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../clients/supabase'
import { useAuthStore } from '../../stores/AuthStore'

import SignupCard from '../../components/account/SignupCard.vue'
import LoginCard from '../../components/account/LoginCard.vue'
import RecoverCard from '../../components/account/RecoverCard.vue'

// const authStore = useAuthStore()
// const router = useRouter()
// const f = reactive({
// 	screenname: '',
// 	email: '',
// 	password: ''
// })

const SignupPage  =()=>{
async function createAccount() {
	console.log('create account')
	console.log('email,password:', f.email, f.password)
	const { data, error } = await supabase.auth.signUp({
		email: f.email,
		password: f.password,
		options: {
			data: { screenname: f.screenname }
		}
	})
	if (error) {
		console.log(error)
	} else {
		authStore.setEmail(f.email)
		authStore.setScreenname(f.screenname)
		authStore.setUid(data.user.id)
		console.log('Account created, referring...')
		router.push({ name: 'checkmail' })
	}

return (
<>
	<div class="cards-draaideur">
		<div class="axis">
			<SignupCard />
			<LoginCard />
			<RecoverCard />
		</div>
	</div>
</>
)
}
}
export default SignupPage

// <style scoped>
// h1,
// form,
// label,
// input,
// button {
// 	display: block;
// 	text-align: left;
// }
// h1 {
// 	margin-bottom: 1rem;
// }
// button {
// 	margin-bottom: 0.5rem;
// 	margin-top: 0.5rem;
// }
// </style>
//
