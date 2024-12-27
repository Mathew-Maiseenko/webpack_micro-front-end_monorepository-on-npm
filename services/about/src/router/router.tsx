import { AboutApp } from '../components/App'
import { createBrowserRouter } from 'react-router-dom'
import React from 'react'

const routes = [
	{
		path: '/about',
		element: <AboutApp />,
		children: [
			{
				path: '/about/main',
				element: <h1>About</h1>,
			},
			{
				path: '/about/secondary',
				element: <h1>Secondary</h1>,
			},
		],
	},
]

export const router = createBrowserRouter(routes)

export default routes
