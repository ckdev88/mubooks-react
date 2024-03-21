// @ts-nocheck
import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'

export default function Countries() {
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

