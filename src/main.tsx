// @ts-nocheck
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"

import Root from './routes/root'
import Contact from './routes/contact'
import ErrorPage from './error-page'
import Login from './routes/account/login'


const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
		errorElement: <ErrorPage />,
		redirect: '/account'
	},
	{
		path: '/contact',
		element: <Contact />,
		errorElement: <ErrorPage />
	},
	{
		path: '/account',
		element: <Login />,
	},
	{
		path: '/account/login',
		element: <Login />,
		ErrorEvent: <ErrorPage />
	}
	// {
	// 	path: '*',
	// 	element: <div>Got lost? 404</div>
	// }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
