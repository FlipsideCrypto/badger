import { Link } from 'react-router-dom';

import { useUser } from "@hooks"

import { ActionButton, ImageLoader } from "@components"

import { sliceAddress } from "@utils";

import { IPFS_GATEWAY_URL } from "@static";

import "@style/View/OrgView.css"

const copy = (text) => navigator.clipboard.writeText(text);

const OrgView = ({ orgId }) => {
    const { organizations } = useUser()

    const org = organizations && organizations.find(org => String(org.id) === orgId);

    return (
        <div className="view">
            <Link className="organization" to="/dashboard/">
                <ImageLoader src={IPFS_GATEWAY_URL + org.image_hash} />
                <span>{org.name}</span>
            </Link>

            <small className="action_bar__header__subtext">
                <span>{org.chain}</span>

                <a target="_blank" rel="noreferrer" className="link-wrapper"
                    href={`https://polygonscan.com/address/${org.ethereum_address}`}>
                    <strong>{sliceAddress(org?.ethereum_address)}</strong>
                </a>
            </small>

            <ActionButton icon={['fal', 'clipboard']} onClick={() => copy(org.ethereum_address)} />

            <ActionButton icon={['fal', 'link']} onClick={() => copy(window.location.href)} />
        </div >
    )
}

export { OrgView };