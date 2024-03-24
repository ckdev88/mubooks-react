// @ts-nocheck
import './index.css'

import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider, useNavigate } from 'react-router-dom'

import Root from './routes/root'
import Contact from './routes/contact'
import ErrorPage from './error-page'
import Login from './routes/account/login'
import ErrorAccountNotFound from './routes/account/ErrorAccountNotFound'
import Countries from './routes/countries'

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
		path: '/account/*',
		element: <Login />,
		errorElement: <ErrorAccountNotFound />,
	},
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
