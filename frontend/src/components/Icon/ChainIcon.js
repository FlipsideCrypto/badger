import { localhost, polygon } from "@static"

import "@style/Icon/ChainIcon.css"

const icons = {
    "1337": localhost,
    "137": polygon,
}

const ChainIcon = ({ chainId }) => {
    const icon = icons[chainId] || '🚨'
    return <img className="chainIcon" src={icon} alt={chainId} />
}

export { ChainIcon }