import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";

import ConnectWalletButton from "../../Button/ConnectWalletButton";
import Logout from "./Logout/Logout";

import "../../../style/Dashboard/Sidebar/Sidebar.css";
import "../../../style/Dashboard/Sidebar/OrgSidebar.css";

const OrgSidebar = ({ organizations }) => {
    const { address } = useAccount();
    const { data: ensName } = useEnsName({
        address: address,
      })
    const { data: ensAvatar } = useEnsAvatar({
        address: address,
    })

    console.log(ensAvatar)

    const account = {
        monocre: "nftchance.eth",
        avatar: "https://avatars.githubusercontent.com/u/77760087?s=200&v=4"
    }

    return (
        <div className="sidebar left">
            {/* Logged in user header */}
            <div className="sidebar__header">
                {address ? 
                    <>
                        <img src={ensAvatar || account.avatar} alt="avatar" />
                        <a href="#">{ensName}</a>
                    </>
                    :
                    <ConnectWalletButton />
                }
            </div>


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