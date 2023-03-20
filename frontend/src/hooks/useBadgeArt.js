import { useEffect, useState } from 'react';

import { useDebounce } from '@hooks';

import { getBadgeImage } from '@utils';

const useBadgeArt = ({ orgName, orgAddress, badgeName, tokenId }) => {
    const [badgeArt, setBadgeArt] = useState(null);

    const debouncedBadgeName = useDebounce(badgeName, 300);

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
            debouncedBadgeName
        ];

        if (!args.every(arg => arg || arg === 0)) return

        getImage(args);
    }, [orgName, orgAddress, debouncedBadgeName, tokenId]);

    return { badgeArt };
}

export { useBadgeArt };