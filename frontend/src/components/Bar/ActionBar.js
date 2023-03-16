import { useState } from "react";

import { useLocation } from "react-router-dom";

import { useENSProfile, useUser } from "@hooks";

import {
    ActionButton,
    ConnectButton,
    LogoutButton,
    OrgView,
    ProfileView
} from "@components"

import { sliceAddress } from "@utils";

import '@rainbow-me/rainbowkit/styles.css'
import "@style/Bar/ActionBar.css";

const ActionBar = () => {
    const { pathname } = useLocation();

    const { address, isConnected, isLoaded } = useUser();

    const { ensAvatar, ensName } = useENSProfile(address);

    const [collapsed, setCollapsed] = useState(true);

    const orgRegex = /\/dashboard\/organization\/(\w+)\/(\w+)/

    const chainId = orgRegex.test(pathname) && orgRegex.exec(pathname)[1]

    const orgAddress = orgRegex.test(pathname) && orgRegex.exec(pathname)[2]

    return (
        <div className="action_bar">
            <div className="action_bar__view">
                {!isConnected && <ConnectButton />}

                {isConnected && (!orgAddress || orgAddress && !isLoaded) && <ProfileView
                    ensAvatar={ensAvatar}
                    ensName={ensName}
                    address={sliceAddress(address)}
                />}

                {isConnected && isLoaded && orgAddress && <OrgView chainId={chainId} orgAddress={orgAddress} />}
            </div>

            <div className="action_bar__toggle">
                <ActionButton
                    className="tertiary"
                    icon={['fal', 'bars']}
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>

            <div className={`action_bar__actions ${collapsed ? 'collapsed' : ''}`}>
                <div className="actions">
                    <ActionButton className="tertiary" icon={['fal', 'star']} afterText="Star on GitHub"
                        link="http://github.com/flipsidecrypto/badger" />

                    {isConnected && address && <LogoutButton />}
                </div>
            </div>
        </div >
    )
}

export { ActionBar };