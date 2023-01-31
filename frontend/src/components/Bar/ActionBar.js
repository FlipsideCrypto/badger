import { useLocation } from "react-router-dom";

import { useENSProfile, useUser } from "@hooks";

import { ActionButton, ConnectButton, LogoutButton, OrgView, ProfileView } from "@components"

import { sliceAddress } from "@utils";

import '@rainbow-me/rainbowkit/styles.css'
import "@style/Bar/ActionBar.css";

const ActionBar = ({ collapsed, setCollapsed }) => {
    const { pathname } = useLocation();

    const { authenticatedAddress, isAuthenticated, isLoaded } = useUser();

    const { ensAvatar, ensName } = useENSProfile(authenticatedAddress);

    const orgRegex = /\/dashboard\/organization\/([0-9]+)\//;

    const orgId = orgRegex.test(pathname) && orgRegex.exec(pathname)[1]

    return (
        <div className="action_bar">
            <div className="action_bar__view">
                {!isAuthenticated && <ConnectButton />}

                {isAuthenticated && (!orgId || orgId && !isLoaded) && <ProfileView
                    ensAvatar={ensAvatar}
                    ensName={ensName}
                    address={sliceAddress(authenticatedAddress)}
                />}

                {isAuthenticated && isLoaded && orgId && <OrgView orgId={orgId} />}
            </div>

            <div className="action_bar__actions">
                <ActionButton icon={['fal', 'star']} afterText="Star on GitHub" 
                    link="http://github.com/flipsidecrypto/badger" />

                <ActionButton icon={['fal', 'question']} afterText="Help" onClick={() => {
                    setCollapsed(!collapsed)
                }} />

                {isAuthenticated && authenticatedAddress && <LogoutButton />}
            </div>
        </div >
    )
}

export { ActionBar };