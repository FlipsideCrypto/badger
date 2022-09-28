import { useEffect } from "react";
import { Link } from 'react-router-dom';

import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { sliceAddress } from "../../../utils/helpers";
import Logout from "./Logout/Logout";

import '@rainbow-me/rainbowkit/dist/index.css';
import "../../../style/Dashboard/Sidebar/Sidebar.css";
import "../../../style/Dashboard/Sidebar/OrgSidebar.css";


const OrgSidebar = ({ organizations }) => {
    const { openConnectModal } = useConnectModal();

    const { address } = useAccount();
    const { data: ensName } = useEnsName({
        address: address,
    })
    const { data: ensAvatar } = useEnsAvatar({
        address: address,
    })

    console.log("ensAvatar", ensAvatar)

    const account = {
        monocre: "nftchance.eth",
        avatar: "https://avatars.githubusercontent.com/u/77760087?s=200&v=4"
    }

    useEffect(() => {
        if (openConnectModal) {
            openConnectModal()
        }
    }, [openConnectModal])

    return (
        <div className="sidebar left">
            {/* Logged in user header */}
            {address ?
                <div className="sidebar__header">
                    <img src={ensAvatar || account.avatar} alt="avatar" />
                    <Link to="/dashboard/">
                        {ensName ? ensName : sliceAddress(address)}
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
                {organizations.map((org, index) => (
                    <div className="sidebar__organization" key={index}>
                        <img src={org.avatar} alt="avatar" />
                        <button className="button-unstyled">{org.name}</button>
                    </div>
                ))}
            </div>

            {/* Logout button */}
            <Logout />
        </div>
    )
}

export default OrgSidebar;