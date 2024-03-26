import { Navigate, useNavigation } from 'react-router-dom'
import NavWrapper from '../components/NavWrapper'
import { supabase } from '../../utils/supabase'
import { createBrowserRouter, redirect, RouterProvider, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Yahs() {
	const [session, setSession] = useState(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])
		const navigate = useNavigate()
if (!session) {
		useEffect(() => {
			navigate('/account/login')
		})
	} else {
		console.log(session)
		useEffect(()=>{navigate('/dashboard')})
		return <div>Logged in!</div>
	}
}

export default function Root() {
	const navigation = useNavigation()
	Yahs()
	return (
		<>
			<header id="header">
				askjdfh
				<NavWrapper />
			</header>
			<main id="main" className={navigation.state === 'loading' ? 'loading...' : ''}>
				main hier, bevat Routerview... moet dit niet in het bestand index.tsx?
			</main>
			<footer id="footer">Hier de onderkant, counter-scripts enzo</footer>
		</>
	)
}
