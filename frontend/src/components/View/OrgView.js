import { useContext } from "react";
import { Link } from 'react-router-dom';

import { UserContext } from "@contexts"

import { ActionButton, ImageLoader } from "@components"

import { sliceAddress } from "@utils";

import { IPFS_GATEWAY_URL } from "@static";

// TODO: Finish refactoring this and then go do ProfileView

const OrgView = ({ orgId }) => {
    const { organizations } = useContext(UserContext);

    const org = organizations && organizations.find(org => String(org.id) === orgId);

    return (
        <div className="action_bar__header">
            <ImageLoader className="action_bar__header__image" src={IPFS_GATEWAY_URL + org.image_hash} />

            <div>
                <Link
                    className="link-wrapper link-text text-clip"
                    to="/dashboard/"
                    style={{ marginTop: "2px", marginRight: "40px", marginBlock: "auto" }}>
                    {org.name}
                </Link>

                <div className="action_bar__header__subtext">
                    <small>
                        <div>{org.chain}</div>

                        <a target="_blank" rel="noreferrer" className="link-wrapper"
                            href={`https://polygonscan.com/address/${org.ethereum_address}`}>
                            <strong>{sliceAddress(org?.ethereum_address)}</strong>
                        </a>
                    </small>

                    <ActionButton
                        icon={['fal', 'clipboard']}
                        onClick={() => navigator.clipboard.writeText(org?.ethereum_address)}
                        style={{ marginLeft: "10px" }}
                        sx={{ minWidth: '36px' }}
                    />

                    <ActionButton
                        icon={['fal', 'link']}
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                        style={{ marginLeft: "10px" }}
                        sx={{ minWidth: '36px' }}
                    />
                </div>
            </div>
        </div>
    )
}

export { OrgView };