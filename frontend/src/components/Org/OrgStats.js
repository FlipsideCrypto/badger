import '@style/Org/OrgStats.css'

// TODO: Pull the stats from somewhere
const OrgStats = orgData => {
	const orgStats = {
		totalMembers: orgData?.holders?.length || 0,
		totalMembersChange: '+12%',
		totalDelegates: orgData?.delegates?.length || 0,
		totalDelegatesChange: '+25%',
		totalValue: 100000,
		totalValueChange: '-12%'
	}

	const USDFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	})

	return (
		<div className="org__stats">
			<div className="org__stats__container container__background">
				{orgStats?.totalMembers !== null && (
					<div className="org__stats__item">
						<h1>{orgStats.totalMembers}</h1>
						<div className="org__stats__item__label">
							<p>Total Members</p>
							<p
								className="org__stats__percent__change"
								style={{
									color: `${
										orgStats.totalMembersChange[0] === '+'
											? '#00FF9D'
											: '#FF0000'
									}`
								}}
							>
								{orgStats.totalMembersChange}
							</p>
						</div>
					</div>
				)}
			</div>
			<div className="org__stats__container container__background">
				{orgStats?.totalDelegates !== null && (
					<div className="org__stats__item">
						<h1>{orgStats.totalDelegates}</h1>
						<div className="org__stats__item__label">
							<p>Unique Delegates</p>
							<p
								className="org__stats__percent__change"
								style={{
									color: `${
										orgStats.totalDelegatesChange[0] === '+'
											? '#00FF9D'
											: '#FF0000'
									}`
								}}
							>
								{orgStats.totalDelegatesChange}
							</p>
						</div>
					</div>
				)}
			</div>
			<div className="org__stats__container container__background">
				{orgStats?.totalValue && (
					<div className="org__stats__item">
						<h1>{USDFormatter.format(orgStats.totalValue)}</h1>
						<div className="org__stats__item__label">
							<p>Assets Value</p>
							<p
								className="org__stats__percent__change"
								style={{
									color: `${
										orgStats.totalValueChange[0] === '+'
											? '#00FF9D'
											: '#FF0000'
									}`
								}}
							>
								{orgStats.totalValueChange}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export { OrgStats }
