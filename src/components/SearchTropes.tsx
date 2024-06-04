import { useState } from 'react'
const SearchTropes = (bookid: Id, tropes: BookTropes) => {
	const [showMore, setShowMore] = useState(false)

	function showMoreToggle() {
		setShowMore(!showMore)
	}

	if (tropes === undefined) return
	return (
		<ul className="tropes clr mb0">
			{tropes.map((trope, index) => {
				if (showMore) {
					return (
						<li className="trope badge" key={'trope' + bookid + index}>
							{trope}
						</li>
					)
				} else if (index < 5) {
					return (
						<li className="trope badge" key={'trope' + bookid + index}>
							{trope}
						</li>
					)
				}
			})}
			<li className="trope_more">
				<button onClick={() => showMoreToggle()} className="btn-sm mb0">
					{showMore ? '<' : '...'}
				</button>
			</li>
		</ul>
	)
}
export default SearchTropes
