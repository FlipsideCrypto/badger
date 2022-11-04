import { useEffect, useContext, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useNetwork, useSwitchNetwork } from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit"

import Logout from "./Logout/Logout";
import ActionButton from "@components/Button/ActionButton";

import { sliceAddress } from "@utils/helpers";
import { getPFPImage } from "@utils/api_requests";
import { useEnsProfile } from "@hooks/useEnsProfile";
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { IPFS_GATEWAY_URL, PLACEHOLDER_AVATAR } from "@static/constants/links";

import { getRandomEmoji } from "@static/constants/constants";

import '@rainbow-me/rainbowkit/styles.css'
import "@style/Dashboard/Sidebar/Sidebar.css";
import "@style/Dashboard/Sidebar/OrgSidebar.css";

const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN;

const OrgSidebar = ({ address }) => {
    const { openConnectModal } = useConnectModal();
    const { ensAvatar } = useEnsProfile(address);

    const { chain } = useNetwork();
    const { chains, switchNetwork } = useSwitchNetwork();
    const [ isWrongNetwork, setIsWrongNetwork ] = useState(false);
    const [ generatedPFP, setGeneratedPFP ] = useState();

    const navigate = useNavigate();
    const { setError } = useContext(ErrorContext);
    const { userData, isAuthenticated, tryAuthentication } = useContext(UserContext);
    const { orgData } = useContext(OrgContext);

    const { pathname: path } = useLocation();
    // kinda hacky way to get our current location outside of Route.
    const orgId = path.includes('organization') && !path.includes('organization/new') ? orgData?.id : null;

    // If chain is not in the keys of current badger addresses, then switch network to the 
    // current primary chain. If programmatic network switching does not work, then change 
    // the connect button to switch network.
    const onSwitchNetworkRequest = useCallback(() => {
        const primaryChain = chains.find(c => c.name === PRIMARY_PRODUCTION_CHAIN)
        switchNetwork?.(primaryChain?.id)

    }, [chains, switchNetwork]
    )

    // If wrong network is detected, then prompt a network switch.
    useEffect(() => {
        setIsWrongNetwork(chain?.name !== PRIMARY_PRODUCTION_CHAIN)

        if (
            chain
            && isWrongNetwork
        )
            onSwitchNetworkRequest();
    }, [chain, isWrongNetwork, onSwitchNetworkRequest]);

    // Opens the connect modal on landing if connection has not already been
    // established in prior session.
    useEffect(() => {
        if (openConnectModal && !address)
            openConnectModal()
    }, [openConnectModal, address])

    // Get a generated PFP if the user does not have an ENS.
    // If they do not have an ENS name, get a random emoji to use instead of a character.
    useEffect(() => {
        async function getGeneratedPFP() {
            const seed = userData?.ens_name ? userData?.ens_name : getRandomEmoji(address);
            const response = await getPFPImage(seed, address);
            if (response.error) {
                setError({
                    label: "Could not get generated PFP",
                    message: response.error
                })
            } else {
                setGeneratedPFP(URL.createObjectURL(response));
            }
        }

        if (isAuthenticated && !ensAvatar) {
            getGeneratedPFP();
        }
    // Only run for ensAvatar or authentication changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ensAvatar, isAuthenticated])

    return (
        <div className="sidebar left">
            <div className="sidebar__fixed__container">
                {/* Logged out user header */}
                {!address &&
                    <button onClick={() => openConnectModal()} style={{ marginBottom: '20px' }}>
                        Connect Wallet
                    </button>
                }

                {/* Wrong network header */}
                {isWrongNetwork && address &&
                    <button onClick={() => onSwitchNetworkRequest()} style={{ marginBottom: '20px' }}>
                        {`Switch to ${PRIMARY_PRODUCTION_CHAIN}`}
                    </button>
                }

                {/* Unauthenticated user header */}
                {address && !isAuthenticated && !isWrongNetwork &&
                    <button onClick={() => tryAuthentication()} style={{ marginBottom: '20px' }}>
                        Sign In
                    </button>
                }

                {/* Logged in user header */}
                {address && !orgId && isAuthenticated && !isWrongNetwork &&
                    <>
                        <div className="sidebar__header">
                            <img 
                                src={ensAvatar} 
                                alt="avatar" 
                                onError={(e) => e.currentTarget.src = generatedPFP} 
                            />
                            <Link className="link-wrapper link-text text-clip" to="/dashboard/" style={{marginTop: "2px"}}>
                                {userData?.ens_name ? userData.ens_name : sliceAddress(address)}
                            </Link>
                        </div>

                    <div className="sidebar__category">
                        <h5>Organizations</h5>
                        <ActionButton 
                            onClick={() => navigate("/dashboard/organization/new")}
                            icon={['fal', 'plus']}
                            sx={{minWidth: '36px'}}
                        />
                    </div>
                </>
            }

            {/* Org level user header */}
            {orgId && orgData?.name && !isWrongNetwork && isAuthenticated &&
                <>
                    <div className="sidebar__header">
                        <img 
                            src={IPFS_GATEWAY_URL + orgData.image_hash} 
                            alt="avatar" 
                            onError={(e) => e.currentTarget.src = PLACEHOLDER_AVATAR}
                        />
                        <Link className="link-wrapper link-text text-clip" to="/dashboard/" style={{marginTop: "2px"}}>
                            {orgData?.name}
                        </Link>
                        <div className="sidebar__header__subtext">
                            <div>{orgData?.chain}</div>
                            <a
                                className="link-wrapper"
                                href={`https://polygonscan.com/address/${orgData?.ethereum_address}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {sliceAddress(orgData?.ethereum_address)}
                            </a>
                        </div>
                    </div>

                        <div className="sidebar__category">
                            <h5>Badges</h5>
                            {/* Hide the new Badge button if the user is not owner of org. */}
                        {orgData?.owner?.ethereum_address === address &&
                            <ActionButton 
                                onClick={() => navigate(`/dashboard/organization/${orgId}/badge/new`)}
                                icon={['fal', 'plus']}
                                sx={{minWidth: '36px'}}
                            />
                            }
                        </div>
                    </>
                }

                {/* List of organizations or badges */}
                {isAuthenticated &&
                    <div className="sidebar__organizations">
                        {orgId && orgData?.name ?
                            orgData?.badges?.map((badge, index) => (
                                <button
                                    key={index}
                                    className="button button__unstyled"
                                    onClick={() => navigate(`/dashboard/organization/${orgData.id}/badge/${badge.id}`)}
                                >
                                    <div className="sidebar__organization">
                                        <img
                                            src={IPFS_GATEWAY_URL + badge.image_hash}
                                            alt="avatar"
                                            onError={(e) => e.currentTarget.src = PLACEHOLDER_AVATAR}
                                        />
                                        <div className="text-clip">
                                            {badge.name}
                                        </div>
                                    </div>
                                </button>
                            ))
                            :
                            userData?.organizations?.map((org, index) => (
                                <button
                                    key={index}
                                    className="button button__unstyled"
                                    onClick={() => navigate(`/dashboard/organization/${org.id}`)}
                                >
                                    <div className="sidebar__organization">
                                        <img
                                            src={IPFS_GATEWAY_URL + org.image_hash}
                                            alt="avatar"
                                            onError={(e) => e.currentTarget.src = PLACEHOLDER_AVATAR}
                                        />
                                        <div className="text-clip">
                                            {org.name}
                                        </div>
                                    </div>
                                </button>
                            ))}
                    </div>
                }

                {/* Logout button */}
                <Logout />
            </div>
        </div>
    )
}

export default OrgSidebar;