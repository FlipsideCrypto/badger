import { useNavigate } from "react-router-dom";

import { handleImageLoad } from "@hooks";

import { Card, ChainIcon, ImageLoader } from "@components";

import { sliceAddress } from "@utils";

import "@style/Card/OrgCard.css"

const OrgCard = ({ org }) => {
    const navigate = useNavigate();

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

                    {org.name}
                </h2>
            </div>
        </Card>
    )
}

export { OrgCard }