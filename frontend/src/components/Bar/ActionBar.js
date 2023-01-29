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

    const orgId = pathname.split('/')[3];
    const badgeId = pathname.includes('badge') ? pathname.split('/')[5] : null; //

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
                <ActionButton
                    link="https://github.com/flipsidecrypto/badger"
                    afterText="Star on GitHub"
                    sx={{ textTransform: 'capitalize' }}
                    icon={['fal', 'star']}
                />

                <ActionButton
                    onClick={() => { setCollapsed(!collapsed) }}
                    afterText="Help"
                    sx={{ textTransform: 'capitalize' }}
                    icon={['fal', 'question']}
                />

                {isAuthenticated && authenticatedAddress && <LogoutButton />}
            </div>
        </div >
    )
}

export { ActionBar };