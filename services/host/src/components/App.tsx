import React, { lazy } from 'react'
const LazyCounter = lazy(() => import('./counter'))
import { Link, Outlet } from 'react-router-dom'

export const App = () => {
	return (
		<>
			<div>React Classes</div>
			<LazyCounter />
			<Outlet />
			<Link to={'/shop'}>Shop</Link>
			<br />
			<Link to={'/about'}>About</Link>
		</>
	)
}
