import { ActionButton } from '@components'
import { useLogout } from '@hooks'
import '@style/Button/LogoutButton.css'
import { useDisconnect } from 'wagmi'

const LogoutButton = () => {
	const { logout } = useLogout()

	const { disconnect } = useDisconnect({
		onSuccess: () => {
			logout()
		}
	})

	return (
		<ActionButton
			className="logout tertiary"
			onClick={disconnect}
			afterText="Logout"
			icon={['fal', 'sign-out']}
		/>
	)
}

export { LogoutButton }
