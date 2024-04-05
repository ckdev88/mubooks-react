import { supabase } from '../../utils/supabase'
import { useEffect } from 'react'
let user
async function getUserAuth() {
	var {
		data: { user },
	} = await supabase.auth.getUser()
	console.log('user poging 2 from DashboardPage.tsx:', user)
	if (!user) return false
	return user
}

async function getUserSession() {
	var { data: session } = await supabase.auth.getSession()
	user = session?.user
	console.log('user in getUserSession', user)
	if (!user) user = getUserAuth()
	return user
}

const useAuthStore = () => {
	user = useEffect(() => {
		getUserSession()
	}, [])
	let isLoggedIn: boolean = false
	if (user) isLoggedIn = true
	const sssa = useEffect(() => {
		getUserSession()
	})
	console.log('laatste:', getUserAuth())
	console.log(sssa)

	// const user: string = 'jan'
	return { user, isLoggedIn }
}

export default useAuthStore
