import './functions/miscEventListeners.ts'
import AddBookPage from './routes/books/AddBookPage'
import AuthConfirm from './routes/auth/Confirm.tsx'
import CheckMailNewAccountPage from './routes/account/CheckMailNewAccountPage'
import CheckMailPasswordPage from './routes/account/CheckMailPasswordPage'
import ClearMyBooks from './routes/books/ClearMyBooks'
import DashboardPage from './routes/account/DashboardPage'
import FavoritesPage from './routes/books/FavoritesPage'
import FinishedPage from './routes/books/FinishedPage'
import NavWrapper from './components/NavWrapper'
import ReadingPage from './routes/books/ReadingPage'
import RootPage from './routes/RootPage'
import SavedBooksPage from './routes/books/SavedBooksPage'
import SearchPage from './routes/books/SearchPage'
import UserLoginPage from './routes/account/UserLoginPage'
import UserLogoutPage from './routes/account/UserLogoutPage'
import UserProfilePage from './routes/account/UserProfilePage'
import WishlistPage from './routes/books/WishlistPage'
import { Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'
import { localStorageKey } from '../utils/supabase'

export const AppContext = createContext<AppContextType>({} as AppContextType)

const App = () => {
	let userIsLoggedInInitVal: boolean
	if (localStorage.getItem(localStorageKey)) userIsLoggedInInitVal = true
	else userIsLoggedInInitVal = false

	// add persistency to userMyBooks state throughout page refreshes
	const csMyBooks = () => {
		// TODO: this loads multi (unnecessary) times on page load, to fix, but low prio
		let localMyBooks: string
		if (localStorage.getItem(localStorageKey) !== null) {
			localMyBooks = JSON.parse(localStorage.getItem(localStorageKey) as string).user.user_metadata.MyBooks
			if (localMyBooks) return localMyBooks.toString()
		}
		return '[]'
	}
	const userMyBooksInitVal: string = csMyBooks()
	// /add persistency to userMyBooks state throughout page refreshes

	const [username, setUsername] = useState<string>('')
	const [usermail, setUsermail] = useState<string>('')
	const [userMyBooks, setUserMyBooks] = useState(userMyBooksInitVal)
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(userIsLoggedInInitVal)
	const [popupNotification, setPopupNotification] = useState<string>('')
	const [popupNotificationShow, setPopupNotificationShow] = useState<boolean>(false)

	if (username === '') {
		if (localStorage.getItem(localStorageKey))
			setUsername(JSON.parse(localStorage.getItem(localStorageKey) as string).user.user_metadata.screenname)
	}

	if (userIsLoggedIn) document.getElementsByTagName('html')[0].classList.add('loggedin')
	else document.getElementsByTagName('html')[0].classList.remove('loggedin')

	function popper() {
		let ret: string
		if (popupNotification) ret = popupNotification
		else ret = ''
		setTimeout(() => setPopupNotification(''), 1000)
		return <>{ret}</>
	}

	return (
		<>
			<AppContext.Provider
				value={{
					username,
					setUsername,
					usermail,
					setUsermail,
					userMyBooks,
					setUserMyBooks,
					userIsLoggedIn,
					setUserIsLoggedIn,
					popupNotification,
					setPopupNotification,
					popupNotificationShow,
					setPopupNotificationShow,
				}}
			>
				{userIsLoggedIn && (
					<header id="header">
						<NavWrapper />
					</header>
				)}
				<main id="main" className="textwrapper">
					<div id="popupNotification" className={popupNotification ? 'show' : 'hide'}>
						{popupNotification && <>{popper()}</>}
					</div>
					<Routes>
						<Route path="/*" Component={RootPage} />
						<Route path="/account/login" Component={UserLoginPage} />
						<Route path="/account/forgotpassword" Component={CheckMailPasswordPage} />
						<Route path="/account/logout" Component={UserLogoutPage} />
						<Route path="/auth/confirm" Component={AuthConfirm} />
						<Route path="/account/new" Component={CheckMailNewAccountPage} />
						{userIsLoggedIn && (
							<>
								<Route path="/account/profile" Component={UserProfilePage} />
								<Route path="/account/*" Component={UserLoginPage} />
								<Route path="/dashboard" Component={DashboardPage} />
								<Route path="/search" Component={SearchPage} />
								<Route path="/add-book" Component={AddBookPage} />
								<Route path="/saved-books" Component={SavedBooksPage} />
								<Route path="/wishlist" Component={WishlistPage} />
								<Route path="/reading" Component={ReadingPage} />
								<Route path="/finished" Component={FinishedPage} />
								<Route path="/favorites" Component={FavoritesPage} />
								<Route path="/clear-my-books" Component={ClearMyBooks} />
							</>
						)}
					</Routes>
				</main>
			</AppContext.Provider>
		</>
	)
}
export default App
