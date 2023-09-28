import { useEffect, useState } from 'react'

import '@style/Hero/LandingHero.css'

const LandingHero = ({ children, className = undefined }) => {
	const [mouse, setMouse] = useState({ left: 0, top: 0 })

	const handleMouseMove = e =>
		setMouse({
			left: e.pageX - 2500,
			top: e.pageY - 2500
		})

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove)

		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	return (
		<>
			<div className="hardLight">
				<div className="softLight" style={{ ...mouse }} />
			</div>

			<div className={className ? `hero ${className}` : 'hero'}>
				<div className="blobs">
					<div className="blob" />
					<div className="blob" />
					<div className="blob" />
				</div>

				{children}
			</div>
		</>
	)
}

export { LandingHero }
