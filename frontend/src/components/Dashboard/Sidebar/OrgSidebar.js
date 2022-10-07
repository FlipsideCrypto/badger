import { useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useEnsAvatar } from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logout from "./Logout/Logout";

import { sliceAddress } from "@utils/helpers";
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { IPFS_GATEWAY_URL } from "@static/constants/links";

import '@rainbow-me/rainbowkit/dist/index.css';
import "@style/Dashboard/Sidebar/Sidebar.css";
import "@style/Dashboard/Sidebar/OrgSidebar.css";

const OrgSidebar = ({ address }) => {
    const { openConnectModal } = useConnectModal();
    const placeholderAvatar = "https://avatars.githubusercontent.com/u/77760087?s=200&v=4";
    const { data: ensAvatar } = useEnsAvatar({
        addressOrName: address,
    });
    
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const { orgData } = useContext(OrgContext);
    
    const params = new URLSearchParams(window.location.search);
    const orgId = params.has("orgId") ? params.get("orgId") : null;

    useEffect(() => {
        if (!openConnectModal) return;
            
        openConnectModal()
    }, [openConnectModal])

    return (
        <div className="sidebar left">
            {/* Logged out user header */}
            {!address && !orgId &&
                <button onClick={() => openConnectModal()} style={{ marginBottom: '20px' }}>
                    Connect Wallet
                </button>
            }

            {/* Logged in user header */}
            {address && !orgId &&
                <>
                    <div className="sidebar__header">
                        <img src={ensAvatar || placeholderAvatar} alt="avatar" />
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
            {orgId && orgData?.name &&
                <>
                    <div className="sidebar__header single">
                        <div className="link-text" style={{marginTop: "2px", color: "#000000"}}>
                            {orgData?.name}
                        </div>
                    </div>

                    <div className="sidebar__category">
                        <h5>Badges</h5>
                        <Link className="link-wrapper" to={`/dashboard/badge/new?orgId=${orgId}`}>
                            <FontAwesomeIcon icon={['fal', 'plus']} />
                        </Link>
                    </div>
                </>
            }

            {/* List of organizations */}
            <div className="sidebar__organizations">
                {orgId && orgData?.name ?
                    orgData?.badges?.map((badge, index) => (
                        <div className="sidebar__organization" key={index}>
                            <img src={`${IPFS_GATEWAY_URL}/${badge.image_hash}` || placeholderAvatar} alt="avatar" />
                            <button 
                                className="button__unstyled"
                                onClick={() => navigate(`/dashboard/badge?orgId=${orgData.id}&badgeId=${badge.token_id}`)}
                            >{badge.name}</button>
                        </div>
                    ))
                    :
                    userData?.organizations?.map((org, index) => (
                        <div className="sidebar__organization" key={index}>
                            <img src={org.avatar || placeholderAvatar} alt="avatar" />
                            <button 
                                className="button__unstyled"
                                onClick={() => navigate(`/dashboard/organization?orgId=${org.id}`)}
                            >{org.name}</button>
                        </div>
                ))}
            </div>
            {/* Logout button */}
            <Logout />
        </div>
    )
}

export default OrgSidebar;