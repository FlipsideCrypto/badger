import { useEffect, useState } from 'react';

import { useDebounce } from '@hooks';

import { getBadgeImage } from '@utils';

const useBadgeArt = ({ orgName, orgAddress, badgeName, tokenId }) => {
    const [badgeArt, setBadgeArt] = useState(null);

    useEffect(() => {
        if (!orgName) return;

        async function getImage(args) {
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
    }, [orgName, orgAddress, badgeName, tokenId]);

    return { badgeArt };
}

export { useBadgeArt };