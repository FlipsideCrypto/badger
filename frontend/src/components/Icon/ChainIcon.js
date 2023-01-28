import { localhost, polygon } from "@static"

import "@style/Icon/ChainIcon.css"

const icons = {
    localhost,
    polygon,
}

const ChainIcon = ({ chain }) => {
    const icon = chain && icons[chain.toLowerCase()] || '🚨'

    return <img className="chainIcon" src={icon} alt={chain} />
}

export { ChainIcon }