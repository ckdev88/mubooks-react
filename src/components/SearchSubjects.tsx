import { useState } from 'react'
import BaseBadge from './ui/BaseBadge';

const SearchSubjects = ({ book_id, subjects }: { book_id: Book['id']; subjects: BookSubjects }) => {
	const [showMore, setShowMore] = useState(false)

	function showMoreToggle() {
		setShowMore(!showMore)
	}

	if (subjects === undefined) return
	return (
		<div className="subjects">
			{subjects.map((subject, index) => {
				if (showMore) {
					return (
						<BaseBadge key={'subject' + book_id + index} type='subject' text={subject} />
					)
				} else if (index < 5) {
					return (
						<BaseBadge key={'subject' + book_id + index} type='subject' text={subject} />
					)
				}
			})}
			<button onClick={() => showMoreToggle()} className="btn-text diblock">
				{showMore ? '<' : '...'}
			</button>
		</div>
	)
}
export default SearchSubjects
