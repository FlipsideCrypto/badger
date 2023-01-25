import { Link } from 'react-router-dom';

import { ActionButton, ImageLoader } from "@components"

const OrgView = ({
    orgData,
    ipfs,
    sliceAddress
}) => {
    return (
        <div className="action_bar__header">
            <ImageLoader
                className="action_bar__header__image"
                src={ipfs + orgData.image_hash}
            />

            <div>
                <Link
                    className="link-wrapper link-text text-clip"
                    to="/dashboard/"
                    style={{ marginTop: "2px", marginRight: "40px", marginBlock: "auto" }}>
                    {orgData?.name}
                </Link>

                <div className="action_bar__header__subtext">
                    <small>
                        <div>{orgData?.chain.slice(0, 5)}</div>

                        <a
                            className="link-wrapper"
                            href={`https://polygonscan.com/address/${orgData?.ethereum_address}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <strong>{sliceAddress(orgData?.ethereum_address)}</strong>
                        </a>
                    </small>

                    <ActionButton
                        icon={['fal', 'clipboard']}
                        onClick={() => navigator.clipboard.writeText(orgData?.ethereum_address)}
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