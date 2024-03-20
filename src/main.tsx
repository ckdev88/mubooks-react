// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Root from './routes/root'
import Contact from './routes/contact'
import ErrorPage from './error-page'

import './index.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root/>,
		errorElement:<ErrorPage/>
	},
	{
	path:'/contact',
		element:<Contact/>,
		errorElement:<ErrorPage/>
	},
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
