import { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ActionButton, Header, Input, OrgTable, SEO } from '@components'
import { useDebounce, useNavigateAddress } from '@hooks'

const Discover = () => {
	const navigate = useNavigateAddress()

	const [organizations, setOrganizations] = useState(null)
	const [search, setSearch] = useState('')

	const debouncedSearch = useDebounce(search, 300)

	const onSearchChange = e => {
		setSearch(e.target.value)
	}

	useEffect(() => {
		const getOrganizations = () => {
			const url = `http://localhost:8000/organizations/?search=${debouncedSearch}`

			fetch(url)
				.then(response => response.json())
				.then(data => {
					setOrganizations(data)
				})
		}

		getOrganizations()
	}, [debouncedSearch])

	return (
		<>
			<SEO title="Discover // Badger" />

			<div className="dashboard">
				<div className="dashboard__contents">
					<div className="dashboard__content">
						<Header back={() => navigate('/dashboard/')} />

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'auto auto',
								alignItems: 'center'
							}}
						>
							<h2>Discover Organizations</h2>

							<p style={{ textAlign: 'right' }}>
								{(organizations && organizations.length) || 0}{' '}
								results
							</p>
						</div>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'auto',
								alignItems: 'center'
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center'
								}}
							>
								<Input
									placeholder="Search..."
									value={search}
									onChange={onSearchChange}
									style={{
										borderTopRightRadius: 0,
										borderBottomRightRadius: 0
									}}
									append={
										<button
											className="primary"
											onClick={() =>
												navigate(
													'/dashboard/organization/new/'
												)
											}
										>
											<span>
												<FontAwesomeIcon
													icon={['fal', 'search']}
												/>
											</span>
										</button>
									}
								/>
							</div>

							{/* <div className="form__group input__group">
                                <ActionButton
                                    className="secondary"
                                    beforeText="All"
                                    icon={['fal', 'sort']}
                                    onClick={() => navigate("/dashboard/organization/new/")} />
                            </div> */}
						</div>
					</div>

					{organizations && organizations.length > 0 && (
						<OrgTable organizations={organizations} />
					)}
				</div>
			</div>
		</>
	)
}

export { Discover }
