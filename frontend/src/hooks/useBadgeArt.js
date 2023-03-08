import { useEffect, useState } from 'react';

import { getBadgeImage } from '@utils';

const useBadgeArt = ({ organization, name }) => {
    const [badgeArt, setBadgeArt] = useState(null);

    useEffect(() => {
        async function getImage() {
            const image = await getBadgeImage(
                organization.name,
                organization.ethereum_address,
                organization.badges.length,
                name
            );

            setBadgeArt(image);
        }

        if (!name || !organization) return
        
        getImage();
    }, [name, organization]);

    return { badgeArt };
}

export { useBadgeArt };