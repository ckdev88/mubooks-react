import { useState } from 'react'
import BooksWithoutPagesList from './BooksWithoutPagesList'
import BooksWithoutStarsList from './BooksWithoutStarsList'
import PieG from './PieG'
import LineG2 from './LineG2'
import LineG3 from './LineG3'
import StatisticsFinishedInMonth from './StatisticsFinishedInMonth'
import StatisticsDaysPerBookInYear from './StatisticsDaysPerBookInYear'
import StatisticsStarsPerBookInYear from './StatisticsStarsPerBookInYear'
import { getDurationDays } from '../Helpers'

const now: Date = new Date()
const curYear = now.getFullYear()
const curYearStartDayNr: Date = new Date(curYear, 0, 0)
const oneDay = 1000 * 60 * 60 * 24
const curYearDayNr: number = Math.floor((Number(now) - Number(curYearStartDayNr)) / oneDay)

const countBookValues = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
	/** Count Books Finished */
	let cbf: number = 0
	/** Count Books Finished Monthly */
	const cbfm: number[] = Array(12).fill(0)
	/** Count Books Without Pages */
	let cbwp: number = 0
	/** Count Pages Finished */
	let cpf: number = 0
	/** Count Pages Finished Monthly */
	const cpfm: number[] = Array(12).fill(0)
	/** Average Days Per Book */
	let adpb: number = 0
	/** Days Per Book array where key is amount of days, value is amount of books */
	const dpb: number[] = []
	/** Average Pages Per Day */
	let appd: number = 0
	/** Counted Books with STars */
	let cbst: number = 0
	/** Counted Books without STars */
	let cbwst: number = 0
	/** Counted STars Total */
	let cstt: number = 0
	/**
	 * Counted STars Per Book
	 * array of 5 values, [0]=1 star, [4]=5 stars, incremented by the amount of books per amount of stars/index
	 */
	const cstpb: number[] = [0, 0, 0, 0, 0]
	/** Average STars Per Book */
	let astpb: number = 0

	const bwp: BooksWithoutPages = []
	const bwst: BooksWithoutStars = []

	let monthIndex: number = 0

	myBooksArr.map((b) => {
		if (b.date_finished !== undefined && Math.floor(b.date_finished / 10000) === year) {
			cbf += 1

			monthIndex = Math.floor((b.date_finished - year * 10000) / 100) - 1
			// get monthly finished books
			cbfm[monthIndex] += 1

			// get pages
			if (Number(b.number_of_pages_median) === 0 || b.number_of_pages_median === undefined) {
				// pages count
				cbwp += 1
				const pageless = { id: b.id, title_short: b.title_short }
				bwp.push(pageless)
			} else if (b.number_of_pages_median > 0) {
				cpf += b.number_of_pages_median
				// add up monthly finished pages
				cpfm[monthIndex] += b.number_of_pages_median
			}

			// get star stats
			if (b.rate_stars > 0) {
				cbst += 1
				cstt += b.rate_stars
				cstpb[b.rate_stars - 1] += 1
			} else {
				cbwst += 1
				const starless = { id: b.id, title_short: b.title_short }
				bwst.push(starless)
			}

			if (b.date_reading !== undefined && b.date_finished !== undefined) {
				const date_difference: number = getDurationDays(b.date_reading, b.date_finished)
				if (dpb[date_difference] === undefined) dpb[date_difference] = 0
				dpb[date_difference] = dpb[date_difference] + 1
				// NOTE: see StatisticsDaysPerBookInYear for further handling, might be better to merge and optimize these two
			}
		}
	})

	if (year === curYear) {
		adpb = Math.floor(curYearDayNr / cbf)
		appd = Math.floor(cpf / curYearDayNr)
	} else {
		adpb = Math.floor(365 / cbf)
		appd = Math.floor(cpf / 365)
	}
	astpb = Number((cstt / cbst).toFixed(1))

	return { cbf, cpf, cbfm, cpfm, cbwp, adpb, appd, astpb, cstpb, bwp, bwst, cbwst, dpb }
}

const StatisticsYear = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
	const { cbf, cpf, cbfm, cpfm, cbwp, adpb, appd, astpb, cstpb, bwp, bwst, cbwst, dpb } = countBookValues({
		myBooksArr,
		year,
	})
	const [showCbfDetails, setShowCbfDetails] = useState<boolean>(false)
	const [showDpbDetails, setShowDpbDetails] = useState<boolean>(false)
	const [showDpbDetails2, setShowDpbDetails2] = useState<boolean>(false)
	const [showStpbDetails, setShowStpbDetails] = useState<boolean>(false)
	const [showStpbDetails2, setShowStpbDetails2] = useState<boolean>(false)
	const [showBfmDetails, setShowBfmDetails] = useState<boolean>(false) // Bfm = Books Finished Monthly

	const monthNames: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	function getMonthName(i: number): string {
		return monthNames[i]
	}

	return (
		<section className="stats-year">
			<h1>Your numbers for {year}</h1>
			<article className="stats-item">
				<h3 className="mb0">Books & pages per month</h3>
				<LineG2 data={cbfm} data2={cpfm} subjects={['Books', 'Pages']} />
				Books finished in {year}: <b>{cbf}</b>
				{cbwp > 0 && <span className="sf">*</span>}{' '}
				<button onClick={() => setShowCbfDetails(!showCbfDetails)} className="btn-text diblock">
					...
				</button>
				{showCbfDetails && (
					<div className="mt05 sf">
						{cbfm.map((c, index) => {
							const yearmonth: number = year * 100 + (index + 1) // year 2022 index 2 > 202203

							return (
								<div key={`cbfm${year}${index}`}>
									{getMonthName(index)}:{' '}
									<b>
										{c} {c === 1 ? 'book' : 'books'}
									</b>
									&nbsp;
									<br />
									{showBfmDetails && (
										<>
											<ul className="mt0 mb0">
												<StatisticsFinishedInMonth yearmonth={yearmonth} />
											</ul>
											{c > 0 && <br />}
										</>
									)}
								</div>
							)
						})}
						<button className="btn-text fs-inherit" onClick={() => setShowBfmDetails(!showBfmDetails)}>
							{showBfmDetails ? 'hide' : 'show'} titles
						</button>
						<br />
						Total Pages read: <b>{cpf}</b>
						<br />
						Average pages per day: <b>{appd}</b>
						<br />
						<br />
						{bwp.length > 0 && (
							<div>
								<i>* Books without pages defined</i>
								<ul className="mt0">
									<BooksWithoutPagesList bwp={bwp} year={year} key={year} />
								</ul>
							</div>
						)}
					</div>
				)}
			</article>
			<article className="stats-item">
				<h3 className="mb0">Days per book</h3>
				<LineG3 data={dpb} />
				Average days to finish a book: <b>{adpb}</b>&nbsp;
				<button className="btn-text diblock" onClick={() => setShowDpbDetails(!showDpbDetails)}>
					...
				</button>
				<div className={showDpbDetails ? 'mt05 sf' : 'mt05 sf dnone'}>
					<>
						<div className={showDpbDetails2 ? 'dnone' : 'dblock'}>
							{dpb.map((b, index) => {
								return (
									<div key={`adpb${year}${index}`}>
										{index} {index === 1 ? 'day' : 'days'}:{' '}
										<b>
											{b} {b === 1 ? `book` : `books`}
										</b>
									</div>
								)
							})}
						</div>
					</>
					{showDpbDetails2 && <StatisticsDaysPerBookInYear year={year} />}
					<button className="btn-text fs-inherit" onClick={() => setShowDpbDetails2(!showDpbDetails2)}>
						{!showDpbDetails2 ? 'show titles' : 'hide titles'}
					</button>
				</div>
				<br />
			</article>
			<article className="stats-item">
				<h3 className="mb0">How I rated my books in {year}</h3>
				<PieG data={cstpb} />
				Average stars per book: <b>{astpb}</b>
				{cbwst > 0 && (
					<>
						<span className="sf">*</span>
						<button onClick={() => setShowStpbDetails(!showStpbDetails)} className="btn-text diblock">
							...
						</button>
						<div className={showStpbDetails ? 'mt05 sf ' : 'mt05 sf dnone'}>
							{cstpb.length > 0 && (
								<>
									<div className={showStpbDetails2 ? 'dnone' : 'dblock'}>
										{cstpb.map((b, index) => {
											return (
												<div key={`cstpb${year}${index}`} className={b === 0 ? 'dnone' : ''}>
													{' '}
													{index + 1} {index + 1 === 1 ? 'star' : 'stars'}:{' '}
													<b>{b} {b === 1 ? 'book' : 'books'}{' '} </b>
												</div>
											)
										})}
									</div>
									{showStpbDetails2 && <StatisticsStarsPerBookInYear year={year} />}{' '}
									<button className="btn-text fs-inherit" onClick={() => setShowStpbDetails2(!showStpbDetails2)}>
										{' '}
										{!showStpbDetails2 ? 'show titles' : 'hide titles'}{' '}
									</button>
								</>
							)}

							{bwst.length > 0 && (
								<div>
									{' '}
									<br /> <i>* Books without stars defined: </i>{' '}
									<ul className="mt0">
										{' '}
										<BooksWithoutStarsList bwst={bwst} year={year} key={year} />{' '}
									</ul>{' '}
								</div>
							)}
						</div>
					</>
				)}
			</article>
		</section>
	)
}

export default StatisticsYear
