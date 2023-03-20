import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const InputAmountDelete = ({ value, onChange, onDelete, isDeleting }) => {
    return (
        <div className="table__inline">
            <input 
                className="table__input mono" 
                value={value} 
                placeholder="1" 
                onChange={onChange} 
            />
            <button 
                className={`delete ${isDeleting && 'active'}`} 
                onClick={onDelete}
            >
                <FontAwesomeIcon icon={["fal","fa-trash"]} />
            </button>
        </div>
    )
}

export { InputAmountDelete }