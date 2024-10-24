import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanIndexKey, cleanInput } from '../helpers/cleanInput'
import { supabase } from '../../utils/supabase'
import BtnInsideCaret from './ui/BtnInsideCaret'
import updateTropesDb from '../functions/updateTropesDb'

const TropesLiked = () => {
	const { setPopupNotification, userid } = useContext(AppContext)
	const [showLikedTropesForm, setShowLikedTropesForm] = useState<boolean>(false)
	const [likedTropes, setLikedTropes] = useState<BookTropes>([])
	const tropesDb = async () => {
		const res = await supabase.from('user_entries').select('tropes_liked')
		if (res.data) {
			setLikedTropes(res.data[0].tropes_liked)
		}
	}

	useEffect(() => {
		tropesDb()
	}, [])

	useEffect(() => {
		if (showLikedTropesForm === true) document.getElementById('trope_add_liked')?.focus()
	}, [showLikedTropesForm])

	async function processLikedTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		let tropeLiked: string
		if (e.currentTarget.trope_add_liked.value !== undefined) {
			tropeLiked = cleanInput(e.currentTarget.trope_add_liked.value, false)
			const newArr = [...likedTropes, tropeLiked]
			setLikedTropes(newArr)
			e.currentTarget.trope_add_liked.value = ''
			e.currentTarget.trope_add_liked.focus()
			const msg: string = await updateTropesDb(newArr, userid, 'tropes_liked')
			setPopupNotification(msg)
		}
	}

	async function removeTrope(trope: string) {
		const newArr = likedTropes.filter((trp) => trp !== trope)
		setLikedTropes(newArr)
		const msg: string = await updateTropesDb(newArr, userid, 'tropes_liked')
		setPopupNotification(msg)
	}

	const cancelSubmit = (): void => {
		setShowLikedTropesForm(false)
	}

	const TropesList = ({ tropes }: { tropes: BookTropes }) => {
		return (
			<ul className="tropes clr mb0">
				{tropes.map((trope, index) => (
					<li className="trope badge cgreen" key={cleanIndexKey(trope, index)}>
						{trope}
						<button className="btn-x" onClick={() => removeTrope(trope)}>
							x
						</button>
					</li>
				))}
				<li className="trope_add">
					<button
						className={showLikedTropesForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
						onClick={() => setShowLikedTropesForm(!showLikedTropesForm)}
					>
						{tropes.length > 0 ? <>+</> : <>Add tropes</>}
					</button>
				</li>
			</ul>
		)
	}
	return (
		<>
			<h2>Like</h2>
			<section className="likedTropes">
				<TropesList tropes={likedTropes} />
				{showLikedTropesForm && (
					<>
						<form className="single-small-form clr" onSubmit={processLikedTropeAddForm}>
							<input type="text" name="trope_add_liked" id="trope_add_liked" placeholder="Add a trope..." />
							<BtnInsideCaret />
						</form>
						<button className="btn-text btn-text-cancel" onClick={() => cancelSubmit()}>
							Cancel
						</button>
					</>
				)}
			</section>
		</>
	)
}
export default TropesLiked
