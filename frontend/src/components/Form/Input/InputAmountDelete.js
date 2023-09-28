import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InputAmountDelete = ({
	canManage,
	value,
	onChange,
	onDelete,
	isDeleting
}) => {
	return (
		<div className="table__inline">
			<input
				className="table__input mono"
				value={value}
				placeholder="1"
				onChange={onChange}
			/>

			{canManage && (
				<button
					className={`delete ${isDeleting && 'active'}`}
					onClick={onDelete}
				>
					<FontAwesomeIcon icon={['fal', 'fa-trash']} />
				</button>
			)}
		</div>
	)
}

export { InputAmountDelete }
