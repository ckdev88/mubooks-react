import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/root'
import Contact from './routes/contact'
import ErrorPage from './error-page'
import Login from './routes/account/login'
import ErrorAccountNotFound from './routes/account/ErrorAccountNotFound'
import Countries from './routes/countries'
import TestPage from './routes/test'
import Error404 from './routes/error404'
import Search from './routes/search'
import CheckMailPage from './routes/account/CheckMailPage'
import CheckMailPasswordPage from './routes/account/CheckMailPasswordPage'
import CheckMailNewAccountPage from './routes/account/CheckMailNewAccountPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/contact',
		element: <Contact />,
	},
	{
		path: '/countries',
		element: <Countries />,
	},
	// {
	// 	path: '/account',
	// 	element: <Login />,
	// 	errorElement: <ErrorAccountNotFound />
	// },
	{
		path: '/account/login',
		element: <Login />,
		errorElement: <ErrorAccountNotFound />,
	},
	{
		path: '/account/checkmail',
		element: <CheckMailPage />,
		errorElement: <Error404 />,
		// component: () => import('./views/account/CheckMailPage.vue'),
		// meta: { requiresAuth: false, requiresNoAuth: false, includeNav: false },
		// props: true
	},
	{
		path: '/account/forgotpassword',
		element: <CheckMailPasswordPage />,
		errorElement: <Error404 />,
	},
	{ path: '/account/new', element: <CheckMailNewAccountPage />, errorElement: <Error404 /> },
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

	// {
	// 	path: '*',
	// 	element: <div>Got lost? 404</div>,
	// },
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<main id="main">
			<RouterProvider router={router} />
		</main>
	</React.StrictMode>
)
