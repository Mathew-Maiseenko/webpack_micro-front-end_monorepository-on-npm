import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import React from 'react'
import { router } from './router/router'

const root = document.getElementById('root')

if (!root) {
	throw new Error('root does not found')
}

const container = createRoot(root)

container.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
