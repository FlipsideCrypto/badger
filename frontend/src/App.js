import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'

import { DashboardWrapper, ScrollToTop, SEO } from '@components'
import { Dashboard, Discover, Page } from '@pages'
import '@style/App.css'

library.add(fal, fab)

const title = 'No-Code Onchain Access Policies // Badger'
const description =
	'Level up the access-controls of your onchain organization and enjoy the benefits of a Web3 focused key solution with modular ERC1155s.'

function App() {
	return (
		<div className="App">
			<SEO title={title} description={description} />

			<Router>
				<ScrollToTop />

				<Routes>
					<Route
						exact
						path="/discover/"
						element={
							<DashboardWrapper
								children={<Discover />}
								paramAddress="all"
							/>
						}
					/>

					<Route
						exact
						path="/dashboard/*"
						element={<DashboardWrapper children={<Dashboard />} />}
					/>

					<Route path="/*" element={<Page />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
