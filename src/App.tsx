// @ts-nocheck
import { useState, useEffect } from 'react'
// import { supabase } from '../utils/supabase'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage'

function App() {
	// const [countries, setCountries] = useState([])
	//
	// useEffect(() => {
	// 	getCountries()
	// }, [])
	//
	// async function getCountries() {
	// 	const { data } = await supabase.from('countries').select()
	// 	setCountries(data)
	// }

	return (
		<Router>
			<div>
				<div>
					<Link to="/">Home</Link>
				</div>
				<Switch>
					<Route path="/pages/" exact>
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
