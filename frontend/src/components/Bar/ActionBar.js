import { useEffect, useContext, useState, useCallback } from "react";
import { useLocation } from 'react-router-dom';

import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

import { OrgContext, UserContext } from "@contexts";

import { useENSProfile } from "@hooks";

import { ActionButton, ConnectButton, LogoutButton, OrgView, ProfileView } from "@components"

import { sliceAddress } from "@utils";

import { IPFS_GATEWAY_URL } from "@static";

import '@rainbow-me/rainbowkit/styles.css'
import "@style/Bar/ActionBar.css";

const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN;

const ActionBar = ({ collapsed, setCollapsed }) => {
    const { chain } = useNetwork();
    const { chains, switchNetwork } = useSwitchNetwork();

    const { authenticatedAddress, isAuthenticated, tryAuthentication } = useContext(UserContext);

    const { ensAvatar, ensName, isFetched: ensFetched } = useENSProfile(authenticatedAddress);

    const { orgData } = useContext(OrgContext);

    const { pathname: path } = useLocation();

    const [isWrongNetwork, setIsWrongNetwork] = useState(false);

    // kinda hacky way to get our current location outside of Route.
    const orgId = path.includes('organization') && !path.includes('organization/new') ? orgData?.id : null;

    // If chain is not in the keys of current badger addresses, then switch network to the 
    // current primary chain. If programmatic network switching does not work, then change 
    // the connect button to switch network.
    const onSwitchNetworkRequest = useCallback(() => {
        const primaryChain = chains.find(c => c.name === PRIMARY_PRODUCTION_CHAIN)
        switchNetwork?.(primaryChain?.id)
    }, [chains, switchNetwork]);

    // If wrong network is detected, then prompt a network switch.
    useEffect(() => {
        setIsWrongNetwork(chain?.name !== PRIMARY_PRODUCTION_CHAIN)

        if (isWrongNetwork && chain)
            onSwitchNetworkRequest();
    }, [chain, isWrongNetwork, onSwitchNetworkRequest]);

    return (
        <div className="action_bar">
            <div className="action_bar__view">
                {!isAuthenticated ?
                    <ConnectButton /> :
                    !orgId || !orgData?.name ? <ProfileView
                        ensAvatar={ensAvatar}
                        ensName={ensName}
                        address={sliceAddress(authenticatedAddress)}
                    /> : <OrgView
                        orgData={orgData}
                        ipfs={IPFS_GATEWAY_URL}
                        sliceAddress={sliceAddress}
                    />}
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