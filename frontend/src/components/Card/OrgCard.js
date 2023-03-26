import { useMemo } from "react";

import { handleImageLoad } from "@hooks";

import { Card, ChainIcon, ImageLoader } from "@components";

import { useNavigateAddress } from "@hooks";

import { formatName, sliceAddress } from "@utils";

import "@style/Card/OrgCard.css"

const OrgCard = ({ org }) => {
    const navigate = useNavigateAddress();

    return (
        <Card onClick={() => navigate(`/dashboard/organization/${org.chain_id}/${org.ethereum_address}`)}>
            <div className="text">
                <div className="subtext">
                    <ChainIcon chainId={org.chain_id} />
                    <strong>{sliceAddress(org.ethereum_address)}</strong>
                </div>

                <h2 className="title">
                    <div className="viewImage__container">
                        <ImageLoader className="viewImage"
                            bypassed={true}
                            prependGateway={true}
                            src={org.image_hash}
                            onLoad={handleImageLoad} />
                    </div>

                    <span>{org.name}</span>
                </h2>
            </div>
        </Card>
    )
}

export { OrgCard }