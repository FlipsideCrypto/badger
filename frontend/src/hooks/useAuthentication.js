import { useContext } from 'react'

import { AuthenticationContext } from '@contexts'

const useAuthentication = () => {
	return { ...useContext(AuthenticationContext) }
}

export { useAuthentication }
