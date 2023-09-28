import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import { StyledEngineProvider } from '@mui/material/styles'
import '@style/index.css'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</StyledEngineProvider>
	</React.StrictMode>
)
