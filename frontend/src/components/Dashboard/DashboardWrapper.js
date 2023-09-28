import { ActionBar, Wallet } from '@components'
import {
	OrgContextProvider,
	UserContextProvider,
	WindowContextProvider
} from '@contexts'

const DashboardWrapper = ({ children, paramAddress }) => {
	const urlParams = new URLSearchParams(window.location.search)
	const address = urlParams.get('address')

	const focusedAddress = paramAddress !== undefined ? paramAddress : address

	return (
		<WindowContextProvider>
			<Wallet>
				<OrgContextProvider paramAddress={focusedAddress}>
					<UserContextProvider>
						<ActionBar />

						{children}
					</UserContextProvider>
				</OrgContextProvider>
			</Wallet>
		</WindowContextProvider>
	)
}

export { DashboardWrapper }
