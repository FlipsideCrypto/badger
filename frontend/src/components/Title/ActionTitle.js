import { ActionButton } from '@components'
import '@style/Title/ActionTitle.css'

const ActionTitle = ({ title, actions }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'auto auto',
				alignItems: 'center'
			}}
		>
			<h2>{title}</h2>

			{actions && (
				<div className="actions">
					{actions.map((action, index) => (
						<ActionButton
							key={index}
							className={action.className}
							onClick={action.onClick}
							icon={action.icon}
							afterText={action.text || action.afterText}
							disabled={action.disabled}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export { ActionTitle }
