import { useMemo } from 'react';

import { Link } from 'react-router-dom';

import { ActionButton, ImageLoader } from "@components"

import { formatName, sliceAddress } from "@utils";

import { IPFS_GATEWAY_URL } from "@static";

import "@style/View/OrgView.css"

const copy = (text) => navigator.clipboard.writeText(text);

const OrgView = ({ organization }) => {
    const formattedName = useMemo(() => formatName(organization?.name), [organization?.name]);

    return (
        <div className="view">
            {organization && <>
                <Link className="organization" to="/dashboard/">
                    <div className="organization__image">
                        <ImageLoader
                            bypass={true}
                            src={IPFS_GATEWAY_URL + organization.image_hash}
                        />
                    </div>
                    <span>{formattedName}</span>
                </Link>

                <small className="action_bar__header__subtext">
                    <span>{organization.chain_id}</span>

                    <a target="_blank" rel="noreferrer" className="link-wrapper"
                        href={`https://polygonscan.com/address/${organization.ethereum_address}`}>
                        <strong>{sliceAddress(organization?.ethereum_address)}</strong>
                    </a>
                </small>

                <div className="action_bar__header__buttons">
                    <ActionButton className="tertiary" icon={['fal', 'clipboard']} onClick={() => copy(organization.ethereum_address)} />
                </div>
            </>}

            {!organization && <>
                <div className="loading short" />
                <div className="loading short" />
            </>}
        </div >
    )
}

export { OrgView };