import { Link, useParams } from 'react-router-dom';

import { useUser } from "@hooks"

import { ActionButton, ImageLoader } from "@components"

import { sliceAddress } from "@utils";

import { IPFS_GATEWAY_URL } from "@static";

import "@style/View/OrgView.css"

const copy = (text) => navigator.clipboard.writeText(text);

const OrgView = ({ chainId, orgAddress }) => {
    const { organization } = useUser({ chainId, orgAddress });

    return (
        <div className="view">
            {organization && <>
                <Link className="organization" to="/dashboard/">
                    <ImageLoader src={IPFS_GATEWAY_URL + organization.image_hash} />
                    <span>{organization.name}</span>
                </Link>

                <small className="action_bar__header__subtext">
                    <span>{organization.chain_id}</span>

                    <a target="_blank" rel="noreferrer" className="link-wrapper"
                        href={`https://polygonscan.com/address/${organization.ethereum_address}`}>
                        <strong>{sliceAddress(organization?.ethereum_address)}</strong>
                    </a>
                </small>

                <ActionButton className="tertiary" icon={['fal', 'clipboard']} onClick={() => copy(organization.ethereum_address)} />
                <ActionButton className="link tertiary" icon={['fal', 'link']} onClick={() => copy(window.location.href)} />
            </>}
        </div >
    )
}

export { OrgView };