import { useState } from 'react'
import { supabase } from '../utils/supabase'
var { data: session } = await supabase.auth.getSession()
var user = session?.user

const authstate = () => {
	let isLoggedIn: boolean
	if (!user) isLoggedIn = false
	else isLoggedIn = true
	return { isLoggedIn }
}
export default authstate
