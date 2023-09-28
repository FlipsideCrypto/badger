import { useEffect, useState } from 'react'

import '@style/Metrics/Metrics.css'

const handleData = data => {
	return Object.keys(data).map(key => {
		return {
			title: key.split('(')[0].trim(),
			value: data[key]
		}
	})
}

const Metrics = () => {
	const keys = {
		'All Time Unique Holders': 2000,
		'Recent Mints': 100,
		'Total Orgs (1+ Member)': 72,
		'Total Mints': 6371
	}

	const [data, setData] = useState(handleData(keys))

	useEffect(() => {
		const getData = async () => {
			const response = await fetch(
				'https://api.flipsidecrypto.com/api/v2/queries/63abf6c7-15b6-4a6b-8aed-bc450764abe0/data/latest'
			)

			const data = await response.json()

			const dataKeys = data
				.filter(item => item.KPI in keys)
				.map(item => {
					return { [item.KPI]: item.Count }
				})
				.reduce((acc, curr) => {
					return { ...curr, ...acc }
				}, {})

			setData(handleData(dataKeys))
		}

		getData()
	}, [])

	return (
		<div className="metrics">
			{data &&
				data.map((item, index) => {
					return (
						<div className="metric" key={index}>
							<div className="metric__value">
								{item.value.toLocaleString()}
							</div>
							<div className="metric__title">{item.title}</div>
						</div>
					)
				})}
		</div>
	)
}

export { Metrics }
