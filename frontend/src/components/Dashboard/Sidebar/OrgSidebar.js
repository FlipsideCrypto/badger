import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit"
import { useEffect, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";

import Logout from "./Logout/Logout";

import '@rainbow-me/rainbowkit/dist/index.css';
import "../../../style/Dashboard/Sidebar/Sidebar.css";
import "../../../style/Dashboard/Sidebar/OrgSidebar.css";

// TODO: No button for connect modal
// TODO: if no ENS then trim address

const OrgSidebar = ({ organizations }) => {
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();

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
                    <button className="button-unstyled" onClick={() => openAccountModal()}>
                        {ensName || address}
                    </button>
                </div>
                :
                <button onClick={() => openConnectModal()} style={{marginBottom: '20px'}}>
                    Connect Wallet
                </button>
            }


            {/* Category header with + button */}
            <div className="sidebar__category">
                <h5>Organizations</h5>
                <FontAwesomeIcon icon={['fal', 'plus']} />
            </div>

            {/* List of organizations */}
            <div className="sidebar__organizations">
                {organizations.map((org, index) => (
                    <div className="sidebar__organization" key={index}>
                        <img src={org.avatar} alt="avatar" />
                        <a href="#">{org.name}</a>
                    </div>
                ))}
            </div>

            {/* Logout button */}
            <Logout />
        </div>
    )
}

export default OrgSidebar;