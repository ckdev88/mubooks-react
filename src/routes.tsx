import Contact from './routes/contact'
import ErrorPage from './error-page'
import Login from './routes/account/login'
import ErrorAccountNotFound from './routes/account/ErrorAccountNotFound'
import TestPage from './routes/test'
import { Navigate,createBrowserRouter } from 'react-router-dom'

import Error404 from './routes/error404'
import Search from './routes/search'
import CheckMailPasswordPage from './routes/account/CheckMailPasswordPage'
import CheckMailNewAccountPage from './routes/account/CheckMailNewAccountPage'
import DashboardPage from './routes/account/DashboardPage'
import LogoutPage from './routes/account/LogoutPage'
// import { useContext } from 'react'
// import { AppContext } from './App'

// const {loginstatus} = useContext(AppContext)
const router = createBrowserRouter([
	{
		path: '/',
		// element: isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/account/login" />, //
		// TODO: fix dit 
		element:<Login/>,
		errorElement: <ErrorPage />,
	},
	{
		path: '/contact',
		element: <Contact />,
	},
	{
		path: '/countries',
		element: <Navigate to="/contact" />,
	},
	// {
	// 	path: '/account',
	// 	element: <Login />,
	// 	errorElement: <ErrorAccountNotFound />
	// },
	{
		path: '/account/login',
		// element: isLoggedIn ? <Navigate to="/dashboard" /> : <Login />,
		element:<Login/>,
		errorElement: <ErrorAccountNotFound />,
	},
	{
		path: '/account/forgotpassword',
		element: <CheckMailPasswordPage />,
		errorElement: <Error404 />,
	},
	{ path: '/account/new', element: <CheckMailNewAccountPage />, errorElement: <Error404 /> },
	{ path: '/account/logout', element: <LogoutPage />, errorElement: <Error404 /> },
	{
		path: '/account/*',
		element: <Login />,
		errorElement: <ErrorAccountNotFound />,
	},
	{
		path: '/test/',
		element: <TestPage />,
		errorElement: <Error404 />,
	},
	{ path: '/search/', element: <Search />, errorElement: <Error404 /> },
	{
		path: '/dashboard',
		// element: !isLoggedIn ? <Navigate to="/account/login" /> : <DashboardPage />,
		element: <DashboardPage/>,
		errorElement: <Error404 />,
	},
])
export default router
