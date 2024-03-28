// import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../App'

const NavWrapper = () => {
	const { loginstatus } = useContext(AppContext)
	if (loginstatus===true) {
		return (
			<>
				<nav id="navIcons">
					<button id="toggleNavBurger" className="collapsed">
						<div className="burger">
							<div className="burgerbar bar1"></div>
							<div className="burgerbar bar2"></div>
							<div className="burgerbar bar2duplo"></div>
							<div className="burgerbar bar3"></div>
						</div>
					</button>
					<div>
						<button className="toggleZoekNav">
							<div className="zoekIcon">
								<div className="glass"></div>
								<div className="glassOuter"></div>
								<div className="stick"></div>
							</div>
						</button>
						<button id="toggleNavProfile" className="collapsed">
							<div className="profileIcon">
								<div className="profileIcon-head"></div>
								<div className="profileIcon-body"></div>
							</div>
						</button>
					</div>
				</nav>
				<nav id="nav0" className="nav-collapsable collapsed">
					<ul></ul>
					<div className="history">
						<button>&lt;</button>
						<button>&gt;</button>
					</div>
				</nav>
				<nav id="nav1" className="nav-collapsable collapsed">
					<ul></ul>
				</nav>
			</>
		)
	}
	return <></>
}
export default NavWrapper
