import { useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useEnsAvatar } from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logout from "./Logout/Logout";

import { sliceAddress } from "@utils/helpers";
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

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
    const { orgData, getOrgData } = useContext(OrgContext);
    
    const params = new URLSearchParams(window.location.search);
    const orgId = params.has("orgId") ? params.get("orgId") : null;
    // const orgObj = orgData?.organizations?.find(org => org.id === orgId); // TODO: are we in array or dict
    const orgObj = getOrgData(orgId); // TODO: This causes too much of a computation strain.

    console.log('siderbar -- user data:', userData, 'org data:', orgData);

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
            {address && !orgObj?.name &&
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
            {address && orgObj?.name &&
                <div className="sidebar__header">
                    <div className="link-text" style={{marginTop: "2px"}}>
                        {orgObj.name}
                    </div>
                </div>
            }

            {/* List of organizations */}
            <div className="sidebar__organizations">
                {orgObj.name ?
                    orgObj?.badges?.map((badge, index) => (
                        <div className="sidebar__organization" key={index}>
                            <img src={badge.image || placeholderAvatar} alt="avatar" />
                            <button 
                                className="button__unstyled"
                                onClick={() => navigate(`/dashboard/organization?orgId=${orgObj.id}&badgeId=${badge.id}`)}
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