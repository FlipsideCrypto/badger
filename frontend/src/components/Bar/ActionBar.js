import { useLocation, useParams } from "react-router-dom";

import { useENSProfile, useUser } from "@hooks";

import { ActionButton, ConnectButton, LogoutButton, OrgView, ProfileView } from "@components"

import { sliceAddress } from "@utils";

import '@rainbow-me/rainbowkit/styles.css'
import "@style/Bar/ActionBar.css";

const ActionBar = () => {
    const { pathname } = useLocation();

    const { authenticatedAddress, isAuthenticated, isLoaded } = useUser();

    const { ensAvatar, ensName } = useENSProfile(authenticatedAddress);

    const orgRegex = /\/dashboard\/organization\/(\w+)\/(\w+)/

    const chainId = orgRegex.test(pathname) && orgRegex.exec(pathname)[1]

    const orgAddress = orgRegex.test(pathname) && orgRegex.exec(pathname)[2]

    return (
        <div className="action_bar">
            <div className="action_bar__view">
                {!isAuthenticated && <ConnectButton />}

                {isAuthenticated && (!orgAddress || orgAddress && !isLoaded) && <ProfileView
                    ensAvatar={ensAvatar}
                    ensName={ensName}
                    address={sliceAddress(authenticatedAddress)}
                />}

                {isAuthenticated && isLoaded && orgAddress && <OrgView chainId={chainId} orgAddress={orgAddress} />}
            </div>

            <div className="action_bar__actions">
                <ActionButton icon={['fal', 'star']} afterText="Star on GitHub"
                    link="http://github.com/flipsidecrypto/badger" />

                {isAuthenticated && authenticatedAddress && <LogoutButton />}
            </div>
        </div >
    )
}

export { ActionBar };