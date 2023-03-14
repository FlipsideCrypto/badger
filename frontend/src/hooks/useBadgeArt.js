import { useEffect, useState } from 'react';

import { getBadgeImage } from '@utils';

const useBadgeArt = ({ orgName, orgAddress, badgeName, tokenId }) => {
    const [badgeArt, setBadgeArt] = useState(null);

    useEffect(() => {        
        async function getImage(args) {
            console.log('getting image', args)
            const image = await getBadgeImage(...args);
            
            setBadgeArt(image);
        }
        
        const args = [
            orgName, 
            orgAddress, 
            tokenId,
            badgeName
        ];

        if (!args.every(arg => arg || arg === 0)) return

        getImage(args);
    }, [badgeName]);

    return { badgeArt };
}

export { useBadgeArt };