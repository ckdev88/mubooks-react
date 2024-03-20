import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import logo from './logo.svg'
import Page404 from './pages/Page404'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
	return (
		<BrowserRouter>
			<Routes>
					<Route index element={<HomePage />} />
					<Route path="*" element={<Page404 />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
