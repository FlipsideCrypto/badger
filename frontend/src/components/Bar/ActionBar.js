import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useENSProfile, useUser } from "@hooks";

import { ActionButton, ConnectButton, LogoutButton, OrgView, ProfileView } from "@components"

import { sliceAddress } from "@utils";

import '@rainbow-me/rainbowkit/styles.css'
import "@style/Bar/ActionBar.css";

// feat: make navbar mobile-friendly
// In preparation of making Badger mobile-first, this is the first PR of many that focuses on mobile-first design while heavily prioritizing the 'average-joe' user experience

const ActionBar = () => {
    const { pathname } = useLocation();

    const { authenticatedAddress, isAuthenticated, isLoaded } = useUser();

    const { ensAvatar, ensName } = useENSProfile(authenticatedAddress);

    const orgRegex = /\/dashboard\/organization\/(\w+)\/(\w+)/

    const chainId = orgRegex.test(pathname) && orgRegex.exec(pathname)[1]

    const orgAddress = orgRegex.test(pathname) && orgRegex.exec(pathname)[2]

    const [collapsed, setCollapsed] = useState(true);

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

            <div className="action_bar__toggle">
                <ActionButton icon={['fal', 'bars']} onClick={() => setCollapsed(!collapsed)} />
            </div>

            <div className={`action_bar__actions ${collapsed ? 'collapsed' : ''}`}>
                <div className="actions">
                    <ActionButton icon={['fal', 'star']} afterText="Star on GitHub"
                        link="http://github.com/flipsidecrypto/badger" />

                    {isAuthenticated && authenticatedAddress && <LogoutButton />}
                </div>
            </div>
        </div >
    )
}

export { ActionBar };