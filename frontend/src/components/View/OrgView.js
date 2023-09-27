import { useMemo } from 'react';

import { Link } from 'react-router-dom';

import { ActionButton, ChainIcon, ImageLoader } from '@components';

import { formatName, sliceAddress } from '@utils';

import { IPFS_GATEWAY_URL } from '@static';

import '@style/View/OrgView.css';

const copy = (text) => navigator.clipboard.writeText(text);

const OrgView = ({ organization }) => {
    const formattedName = useMemo(() => formatName(organization?.name), [organization?.name]);

    return (
        <div className="view">
            {organization && (
                <>
                    <div className="organization">
                        <Link to="/dashboard/">
                            <div className="organization__image">
                                <ImageLoader bypass={true} src={IPFS_GATEWAY_URL + organization.image_hash} />
                                <ChainIcon chainId={organization.chain_id} />
                            </div>
                            <span>{formattedName}</span>
                        </Link>

                        <small>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                className="organization__metadata"
                                href={`https://polygonscan.com/address/${organization.ethereum_address}`}
                            >
                                {sliceAddress(organization?.ethereum_address)}
                            </a>
                        </small>
                    </div>

                    <div className="action_bar__header__buttons">
                        <ActionButton
                            className="tertiary"
                            afterText={'Copy'}
                            icon={['fal', 'clipboard']}
                            onClick={() => copy(organization.ethereum_address)}
                        />
                    </div>
                </>
            )}

            {!organization && (
                <>
                    <div className="loading short" />
                    <div className="loading short" />
                </>
            )}
        </div>
    );
};

export { OrgView };
