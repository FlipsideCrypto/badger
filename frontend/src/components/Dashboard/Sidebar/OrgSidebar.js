import { useEffect, useContext, useState, useCallback } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useEnsAvatar, useNetwork, useSwitchNetwork } from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logout from "./Logout/Logout";

import { sliceAddress } from "@utils/helpers";
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { IPFS_GATEWAY_URL, PLACEHOLDER_AVATAR } from "@static/constants/links";

import '@rainbow-me/rainbowkit/styles.css'
import "@style/Dashboard/Sidebar/Sidebar.css";
import "@style/Dashboard/Sidebar/OrgSidebar.css";

// const BADGER_ADDRESSES = JSON.parse(process.env.REACT_APP_BADGER_ADDRESSES)
const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN;

const OrgSidebar = ({ address }) => {
    const { openConnectModal } = useConnectModal();
    const { data: ensAvatar } = useEnsAvatar({
        addressOrName: address,
        chainId: 1
    });
    const { chain } = useNetwork();
    const { chains, switchNetwork } = useSwitchNetwork();
    const [ cannotSwitchNetwork, setCannotSwitchNetwork ] = useState(false);

    const navigate = useNavigate();
    const { userData, authenticationError, setIsAuthenticating } = useContext(UserContext);
    const { orgData } = useContext(OrgContext);

    // kinda hacky way to get our current location.
    const path = window.location.pathname
    const orgId = path.includes('organization') && !path.includes('organization/new') ? orgData?.id : null;

    // Dual purpose connect button. If we're not connected, connect with rainbowkit else if 
    // we are connected, use it to kick off the SIWE process in event of a cancelled signature.
    const onConnect = () => {
        if (!address)
            openConnectModal();
        else
            setIsAuthenticating(true);
    }

    // If chain is not in the keys of current badger addresses, then switch network to the 
    // current primary chain. If programmatic network switching does not work, then change 
    // the connect button to switch network.
    const onSwitchNetworkRequest = useCallback(() => {
        try {
            const primaryChain = chains.find(c => c.name === PRIMARY_PRODUCTION_CHAIN)
            switchNetwork?.(primaryChain.id)
            setCannotSwitchNetwork(false);
        } 
        catch {
            setCannotSwitchNetwork(true);
        }}, 
        [chains, switchNetwork]
    )
    useEffect(() => {
        onSwitchNetworkRequest();
    }, [chain, chains, onSwitchNetworkRequest]);

    // Opens the connect modal on landing if connection has not already been
    // established in prior session.
    useEffect(() => {
        if (!openConnectModal) return;
            
        openConnectModal()
    }, [openConnectModal])

    return (
        <div className="sidebar left">
            {/* Logged out user header */}
            {!orgId && authenticationError && !cannotSwitchNetwork &&
                <button onClick={() => onConnect()} style={{ marginBottom: '20px' }}>
                    Connect Wallet
                </button>
            }

            {/* Wrong network header */}
            {cannotSwitchNetwork &&
                <button onClick={() => onSwitchNetworkRequest()} style={{ marginBottom: '20px' }}>
                    {`Switch to ${PRIMARY_PRODUCTION_CHAIN}`}
                </button>
            }

            {/* Logged in user header */}
            {address && !orgId && !authenticationError && !cannotSwitchNetwork &&
                <>
                    <div className="sidebar__header">
                        <img src={ensAvatar || PLACEHOLDER_AVATAR} alt="avatar" />
                        <Link className="link-wrapper link-text" to="/dashboard/" style={{marginTop: "2px"}}>
                            {userData?.ens_name ? userData.ens_name : sliceAddress(address)}
                        </Link>
                    </div>

                    <div className="sidebar__category">
                        <h5>Organizations</h5>
                        <Link className="link-wrapper" to="/dashboard/organization/new">
                            <FontAwesomeIcon icon={['fal', 'plus']} />
                        </Link>
                    </div>
                </>
            }

            {/* Org level user header */}
            {orgId && orgData?.name && !cannotSwitchNetwork &&
                <>
                    <div className="sidebar__header">
                        <img 
                            src={IPFS_GATEWAY_URL + orgData.image_hash} 
                            alt="avatar" 
                            onError={(e) => e.currentTarget.src = PLACEHOLDER_AVATAR}
                        />
                        <Link className="link-wrapper link-text" to="/dashboard/" style={{marginTop: "2px"}}>
                            {orgData?.name}
                        </Link>
                    </div>

                    <div className="sidebar__category">
                        <h5>Badges</h5>
                        <Link className="link-wrapper" to={`/dashboard/organization/${orgId}/badge/new`}>
                            <FontAwesomeIcon icon={['fal', 'plus']} />
                        </Link>
                    </div>
                </>
            }

            {/* List of organizations or badges */}
            <div className="sidebar__organizations">
                {orgId && orgData?.name ?
                    orgData?.badges?.map((badge, index) => (
                        <div className="sidebar__organization" key={index}>
                            <img 
                                src={IPFS_GATEWAY_URL + badge.image_hash} 
                                alt="avatar" 
                                onError={(e) => e.currentTarget.src = PLACEHOLDER_AVATAR}
                            />
                            <button 
                                className="button__unstyled"
                                onClick={() => navigate(`/dashboard/organization/${orgData.id}/badge/${badge.id}`)}
                            >
                                {badge.name}
                            </button>
                        </div>
                    ))
                    :
                    userData?.organizations?.map((org, index) => (
                        <div className="sidebar__organization" key={index}>
                            <img 
                                src={IPFS_GATEWAY_URL + org.image_hash} 
                                alt="avatar" 
                                onError={(e) => e.currentTarget.src = PLACEHOLDER_AVATAR}
                            />
                            <button 
                                className="button__unstyled"
                                onClick={() => navigate(`/dashboard/organization/${org.id}`)}
                            >
                                {org.name}
                            </button>
                        </div>
                ))}
            </div>
            {/* Logout button */}
            <Logout />
        </div>
    )
}

export default OrgSidebar;