import { useEffect, useContext, useState, useCallback } from "react";
import { useLocation } from 'react-router-dom';

import { useNetwork, useSwitchNetwork } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit"

import { useEnsProfile } from "@hooks/useEnsProfile";
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

import { sliceAddress } from "@utils/helpers";
import { IPFS_GATEWAY_URL } from "@static/constants/links";

import ActionButton from "@components/Button/ActionButton";
import ProfileView from "./views/ProfileView";
import OrgView from "./views/OrgView";
import Logout from "./Logout";

import '@rainbow-me/rainbowkit/styles.css'
import "@style/Dashboard/ActionBar/ActionBar.css";

const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN;

const ActionBar = ({ address, collapsed, setCollapsed }) => {
    const { chain } = useNetwork();
    const { chains, switchNetwork } = useSwitchNetwork();

    const { openConnectModal } = useConnectModal();
    const { ensAvatar, ensName, isFetched: ensFetched } = useEnsProfile(address);

    const { userData, isAuthenticated, tryAuthentication } = useContext(UserContext);
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

    // Opens the connect modal on landing if connection has not already been
    // established in prior session.
    useEffect(() => {
        if (openConnectModal && !address)
            openConnectModal()
    }, [openConnectModal, address])

    return (
        <div className="action_bar">
            <div className="action_bar__view">
                {!address
                    ? <button onClick={openConnectModal}>
                        Connect Wallet
                    </button>
                    : isWrongNetwork ?
                        <button onClick={onSwitchNetworkRequest}>
                            {`Switch to ${PRIMARY_PRODUCTION_CHAIN}`}
                        </button>
                        : !isAuthenticated || !ensFetched ?
                            <button onClick={tryAuthentication}>
                                Sign In
                            </button>
                            : !orgId || !orgData?.name ? <ProfileView
                                ensAvatar={ensAvatar}
                                ensName={ensName}
                                address={sliceAddress(address)}
                            />
                                : <OrgView
                                    orgData={orgData}
                                    ipfs={IPFS_GATEWAY_URL}
                                    sliceAddress={sliceAddress}
                                />

                }
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


                {address && <Logout />}
            </div>
        </div >
    )
}

export default ActionBar;