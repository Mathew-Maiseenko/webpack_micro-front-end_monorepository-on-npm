import React, { lazy } from 'react'
import { Link, Outlet } from 'react-router-dom'

export const ShopApp = () => {
	return (
		<>
			<div>Shop</div>
			<Link to={'/shop/main'}> to shop main</Link>
			<Outlet />
		</>
	)
}
