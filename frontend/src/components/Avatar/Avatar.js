const Avatar = ({ avatar }) => {
	return (
		<div
			className="address__avatar"
			style={{
				backgroundImage: `url(${avatar})`
			}}
		></div>
	)
}

export { Avatar }
