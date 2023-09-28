const ErrorWindow = ({ children }) => {
	return (
		<>
			<div className="window">
				<div className="error">
					<div className="title"></div>
				</div>
			</div>

			{children}
		</>
	)
}

export { ErrorWindow }
