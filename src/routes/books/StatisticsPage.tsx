// TODO: create graphs when all data is available
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import getFinishedBooksStatsYears from '../../functions/getFinishedBooksStatsYears'
import StatisticsYear from '../../components/StatisticsYear'

const pageTitle = 'Mu Statistics'

const StatisticsPage = () => {
	const { userMyBooks } = useContext(AppContext)
	const [years, setYears] = useState<number[]>([])
	useEffect(() => {
		const { yearArr } = getFinishedBooksStatsYears(userMyBooks)
		setYears(yearArr)
	}, [userMyBooks])

	return (
		<>
			<h1>{pageTitle}</h1>

			{years.map((y) => {
				const filteredByYear = userMyBooks.filter(
					(b) => b.date_finished !== undefined && Math.floor(b.date_finished / 10000) === y
				)
				return <StatisticsYear myBooksArr={filteredByYear} year={y} key={`statisticsPageYear${y}`} />
			})}
		</>
	)
}

export default StatisticsPage
