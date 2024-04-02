import { Routes, Route } from 'react-router-dom'
import NavWrapper from './components/NavWrapper'
import { createContext, useEffect, useState } from 'react'
import ErrorAccountNotFound from './routes/account/ErrorAccountNotFound'
import Error404 from './routes/error404'
import CheckMailPasswordPage from './routes/account/CheckMailPasswordPage'
import CheckMailNewAccountPage from './routes/account/CheckMailNewAccountPage'
import UserProfilePage from './routes/account/UserProfilePage'
import UserLogoutPage from './routes/account/UserLogoutPage'
import DashboardPage from './routes/account/DashboardPage'
import SearchPage from './routes/books/SearchPage'
import SavedBooksPage from './routes/books/SavedBooksPage'
import { useNavigate } from 'react-router-dom'
import { localStorageKey } from '../utils/supabase'
import ClearMyBooks from './routes/books/ClearMyBooks'
import UserLoginPage from './routes/account/UserLoginPage'

export const AppContext = createContext<AppContextType>({} as AppContextType)

const App = () => {
	const navigate = useNavigate()
	useEffect(() => {
		if (localStorage.getItem(localStorageKey) === null) navigate('/account/login')
		else setUserIsLoggedIn(true)
	}, [])
	const [username, setUsername] = useState<string>('')
	const [usermail, setUsermail] = useState<string>('')
	const [userMyBooks, setUserMyBooks] = useState<string>('')
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false)

	return (
		<>
			<AppContext.Provider
				value={{ username, setUsername, usermail, setUsermail, userMyBooks, setUserMyBooks, userIsLoggedIn, setUserIsLoggedIn }}
			>
				<header id="header">
					<NavWrapper />
				</header>
				<main id="main">
					{userMyBooks}
					<Routes>
						<Route path="/" element={<UserLoginPage />} errorElement={<ErrorAccountNotFound />} />
						<Route
							path="/account/login"
							element={<UserLoginPage />}
							errorElement={<ErrorAccountNotFound />}
						/>
						<Route
							path="/account/forgotpassword"
							element={<CheckMailPasswordPage />}
							errorElement={<Error404 />}
						/>
						<Route
							path="/account/new"
							element={<CheckMailNewAccountPage />}
							errorElement={<Error404 />}
						/>
						<Route path="/account/profile" element={<UserProfilePage />} errorElement={<Error404 />} />
						<Route path="/account/logout" element={<UserLogoutPage />} errorElement={<Error404 />} />
						<Route path="/account/*" element={<UserLoginPage />} errorElement={<ErrorAccountNotFound />} />
						<Route path="/dashboard" element={<DashboardPage />} errorElement={<Error404 />} />
						<Route path="/search" element={<SearchPage />} errorElement={<Error404 />} />
						<Route path="/saved-books" element={<SavedBooksPage />} errorElement={<Error404 />} />
						<Route path="/clear-my-books" element={<ClearMyBooks />} errorElement={<Error404 />} />
					</Routes>
				</main>
			</AppContext.Provider>
		</>
	)
}
export default App
