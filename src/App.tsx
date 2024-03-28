import { RouterProvider } from 'react-router-dom'
import NavWrapper from './components/NavWrapper'
import router from './routes'
import { createContext, useState } from 'react'

interface AppContextType {
	username: string
	setUsername(username: string): void
	loginstatus: boolean
	setLoginstatus(loginstatus: boolean): void
}

export const AppContext = createContext<AppContextType>({} as AppContextType)
const App = () => {
	const [username, setUsername] = useState<string>('')
	const [loginstatus, setLoginstatus] = useState<boolean>(false)

	return (
		<>
			<AppContext.Provider value={{ username, setUsername, loginstatus, setLoginstatus }}>
				<header id="header">
					<NavWrapper />
				</header>
				<main id="main">
					<RouterProvider router={router} />
				</main>
			</AppContext.Provider>
		</>
	)
}
export default App
