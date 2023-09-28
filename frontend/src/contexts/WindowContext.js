import { createContext, useState } from 'react'

const WindowContext = createContext()

const WindowContextProvider = ({ children }) => {
	const initialState = {
		status: '',
		title: '',
		body: '',
		hash: '',
		lastClick: null
	}

	const [transaction, setTransaction] = useState(initialState)

	const isTransaction = transaction.status !== ''

	const onStart = ({ title, body, click }) => {
		setTransaction({
			status: 'loading',
			title,
			body,
			lastClick: click
		})
	}

	const onSign = ({ title, body, hash }) => {
		setTransaction(state => ({
			...state,
			status: 'signed',
			title,
			body,
			hash
		}))
	}

	const onSuccess = () => {
		setTransaction(initialState) // Empty for now. Success message when we have it.
	}

	const onError = () => {
		setTransaction(initialState)
	}

	const onClose = () => {
		setTransaction(initialState)
	}

	const transactionWindow = {
		onStart,
		onSign,
		onSuccess,
		onError,
		onClose
	}

	return (
		<WindowContext.Provider
			value={{
				transaction,
				transactionWindow,
				isTransaction
			}}
		>
			{children}
		</WindowContext.Provider>
	)
}

export { WindowContext, WindowContextProvider }
