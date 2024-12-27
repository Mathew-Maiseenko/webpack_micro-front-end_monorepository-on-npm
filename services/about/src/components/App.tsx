import React from 'react'
import { Outlet } from 'react-router-dom'

export const AboutApp = () => {
	return (
		<>
			<div>About</div>
			<Outlet />
		</>
	)
}
