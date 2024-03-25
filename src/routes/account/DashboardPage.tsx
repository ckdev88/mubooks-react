import { useEffect } from 'react'
import { supabase } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'
import QuoteCard from '../../components/QuoteCard'

let { data: { user }, } = await supabase.auth.getUser()

type User_metadata = {
	email: string
	email_verified: boolean
	screenname: string
	sub: string
}

const DashboardPage = () => {
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) navigate('/account/login')
	})
	const usermeta = user.user_metadata as User_metadata
	return (
		<>
			<h1>Hi, {usermeta.screenname}</h1>
			<p>
				MuBOOKS is your journal for your books.
				<br />
				Let's get started!
			</p>
			<QuoteCard />
		</>
	)
}
export default DashboardPage
