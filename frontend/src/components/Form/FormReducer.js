const initialOrgForm = {
	name: '',
	description: '',
	contract_uri_hash: '',
	owner: '',
	ethereum_address: '',
	chain: ''
}

const initialBadgeForm = {
	name: '',
	description: '',
	attributes: [],
	delegates: [],
	image_hash: '',
	ethereum_address: '',
	token_id: '',
	organization: '',
	account_bound: true,
	claimable: false,
	signer: '',
	is_active: false
}

const FormReducer = (state, action) => {
	let newState
	let newKeyValue
	switch (action.type) {
		case 'SET':
			return {
				...state,
				[action.field]: action.payload
			}
		case 'SET_ALL':
			return action.payload
		case 'SET_MULTIPLE':
			return {
				...state,
				...action.payload
			}
		case 'DELETE_ARRAY_INDEX':
			return {
				...state,
				[action.field]: state[action.field].filter(
					(item, index) => index !== action.index
				)
			}
		case 'UPDATE_ARRAY_INDEX':
			// if (!state[action.field])
			newState = [...state[action.field]]
			newState[action.index] = action.payload
			return {
				...state,
				[action.field]: newState
			}
		case 'UPDATE_KEY_VALUE_ARRAY':
			newState = [...state[action.field]]
			newKeyValue = { ...newState[action.index] }
			newKeyValue[action.key] = action.payload
			newState[action.index] = newKeyValue
			return {
				...state,
				[action.field]: newState
			}
		default:
			return state
	}
}

export { FormReducer, initialBadgeForm, initialOrgForm }
