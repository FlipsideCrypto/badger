import { Route, Routes } from 'react-router-dom'

import { Footer, Navbar } from '@components'
import { FAQ, Landing, Media, Privacy, Stories, Story, Terms } from '@pages'
import '@style/pages/Page.css'

const Page = () => {
	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/faq/" element={<FAQ />} />
				<Route path="/stories/" element={<Stories />} />
				<Route path="/stories/:slug/" element={<Story />} />

				<Route path="/privacy/" element={<Privacy />} />
				<Route path="/terms/" element={<Terms />} />
				<Route path="/media/" element={<Media />} />

				<Route exact path="/" element={<Landing />} />
			</Routes>

			<Footer />
		</>
	)
}

export { Page }
