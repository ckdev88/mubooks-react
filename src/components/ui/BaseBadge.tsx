interface BaseBadgeProps {
	key: string
	text: string
	removeText?: (text: string) => void
	removeTrope?: (
		text: string,
		field: 'tropes_liked' | 'tropes_disliked'
	) => void
	field?: 'tropes_liked' | 'tropes_disliked'
	type?:'subject'|'trope'|'author'
}

const BaseBadge = ({
	key,
	text,
	removeText,
	removeTrope,
	field,
	type
}: BaseBadgeProps) => {
	let removeable = false
	if (removeText !== undefined || removeTrope !== undefined) removeable = true
	let classname = 'badge'
	if (field === 'tropes_liked') classname += ' cgreen'
	if (field === 'tropes_disliked') classname += ' cred'
	if (type === 'subject') classname += ' subject'
	if (type === 'trope') classname += ' trope'
	return (
		<div className={classname} key={key}>
			{text}
			{removeable && removeText !== undefined && (
				<button className="btn-x" onClick={() => removeText(text)}>
					x
				</button>
			)}
			{removeable && removeTrope !== undefined && field && (
				<button
					className="btn-x"
					onClick={() => removeTrope(text, field)}
				>
					x
				</button>
			)}
		</div>
	)
}
export default BaseBadge
