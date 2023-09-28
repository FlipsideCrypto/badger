import { useContext } from 'react'

import { WindowContext } from '@contexts'

const useWindow = () => {
	return { ...useContext(WindowContext) }
}

export { useWindow }
