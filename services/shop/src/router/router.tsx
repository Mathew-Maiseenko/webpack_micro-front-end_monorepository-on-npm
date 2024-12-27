import { ShopApp } from '../components/App'
import { createBrowserRouter, Link } from 'react-router-dom'
import React from 'react'

const routes = [
	{
		path: '/shop',
		element: <ShopApp />,
		children: [
			{
				path: '/shop/main',
				element: (
					<>
						<h1>Shop main</h1>
						<Link to={'/shop/secondary'}> to Secondary Shop</Link>
					</>
				),
			},
			{
				path: '/shop/secondary',
				element: (
					<>
						<h1>Secondary Shop</h1>
						<Link to={'/shop/main'}> to Shop main</Link>
					</>
				),
			},
		],
	},
]

export const router = createBrowserRouter(routes)

export default routes
