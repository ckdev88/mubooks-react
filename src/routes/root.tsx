import { useNavigation } from "react-router-dom"
import NavWrapper from "../components/NavWrapper"

export default function Root() {
	const navigation = useNavigation()
	console.log(navigation)
	return (
		<>
			<header id="header">
				<NavWrapper />
			</header>
			<main id="main" className={navigation.state === "loading" ? "loading..." : ""}>
				main hier, bevat Routerview... moet dit niet in het bestand index.tsx?

			</main>
			<footer id="footer">Hier de onderkant, counter-scripts enzo</footer>
		</>
	)
}

