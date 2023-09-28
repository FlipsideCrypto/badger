import { ErrorWindow, MessageWindow } from '@components'

const DashboardContent = ({ children }) => {
	return (
		<div className="dashboard__contents">
			<div className="dashboard__content">
				<ErrorWindow>
					<MessageWindow>{children}</MessageWindow>
				</ErrorWindow>
			</div>
		</div>
	)
}

export { DashboardContent }
