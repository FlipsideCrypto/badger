import { useEffect, useContext } from "react";
import { Link, useParams } from 'react-router-dom';
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
    
    const { orgId } = useParams();
    const { userData } = useContext(UserContext);
    const { orgData } = useContext(OrgContext);

    useEffect(() => {
        if (!openConnectModal) return;
            
        openConnectModal()
    }, [openConnectModal])

    return (
        <div className="sidebar left">
            {/* Logged in user header */}
            {address ?
                <div className="sidebar__header">
                    <img src={ensAvatar || placeholderAvatar} alt="avatar" />
                    <Link className="link-wrapper link-text" to="/dashboard/" style={{marginTop: "2px"}}>
                        {userData?.ens_name ? userData.ens_name : sliceAddress(address)}
                    </Link>
                </div>
                :
                <button onClick={() => openConnectModal()} style={{ marginBottom: '20px' }}>
                    Connect Wallet
                </button>
            }


            {/* Category header with + button */}
            <div className="sidebar__category">
                <h5>Organizations</h5>
                <Link className="link-wrapper" to="/dashboard/organization/new">
                    <FontAwesomeIcon icon={['fal', 'plus']} />
                </Link>
            </div>

            {/* List of organizations */}
            <div className="sidebar__organizations">
                {userData?.organizations?.map((org, index) => (
                    <div className="sidebar__organization" key={index}>
                        <img src={org.avatar || placeholderAvatar} alt="avatar" />
                        <button className="button__unstyled">{org.name}</button>
                    </div>
                ))}
            </div>
            {/* Logout button */}
            <Logout />
        </div>
    )
}

export default OrgSidebar;