// @ts-nocheck
import { supabase } from '../../utils/supabase'
import { useState, useEffect } from 'react'

function TestPage() {
	const [countries, setCountries] = useState([])
	useEffect(() => {
		getCountries()
	}, [])
	async function getCountries() {
		const { data } = await supabase.from('countries').select()
		setCountries(data)
	}

	return (
		<ul>
			{countries.map((country) => (
				<li key={country.name}>{country.name}</li>
			))}
		</ul>
	)
}
export default TestPage
