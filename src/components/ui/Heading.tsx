import { ReactNode } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'

// OPTIMIZE themes_icons: apply smart way of determining light or dark icon based on current theme, currently turned off via GLOBALS.headingIconsEnabled=false
const Heading = ({
	el = 'h1',
	text,
	icon,
	sub,
	span,
}: {
	el?: 'h1' | 'h2' | 'adder-header'
	text: string
	icon?: string
	sub?: ReactNode
	span?: ReactNode
}) => {
	const { GLOBALS } = useContext(AppContext)
	if (GLOBALS.headingIconsEnabled && icon) {
		return (
			<div className={el + ' ' + `${el}-with-icon`}>
				<div>
					{text} {icon && <img src={`/img/${icon}`} alt="" className="h1-icon" />}
				</div>
				{sub && <sub>{sub}</sub>}
				{span && <span>{span}</span>}
			</div>
		)
	}
	return (
		<div className={el}>
			{text}
			{sub && <sub>{sub}</sub>}
			{span && <span>{span}</span>}
		</div>
	)
}
export default Heading
