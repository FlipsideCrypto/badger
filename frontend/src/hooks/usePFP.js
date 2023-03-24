import { useEffect, useState } from 'react';

import { getPFPImage } from '@utils';

const usePFP = ({ name, address }) => {
    const [pfp, setPFP] = useState(' ');

    const formattedName = name.charAt(0).toUpperCase();

    useEffect(() => {
        async function getImage() {
            const image = await getPFPImage(name, address);

            setPFP(image);
        }

        if (!formattedName || !address) return

        getImage();
    }, [formattedName, address]);

    return { pfp };
}

export { usePFP };