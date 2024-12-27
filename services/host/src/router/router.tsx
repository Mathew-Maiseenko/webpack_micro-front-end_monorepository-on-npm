import { App } from '../components/App'
import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
// @ts-ignore
import shopRoutes from 'shop/Router'
// @ts-ignore
import adminRoutes from 'about/Router'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [...shopRoutes, ...adminRoutes],
	},
])
