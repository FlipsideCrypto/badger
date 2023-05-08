import { useEffect, useState } from 'react';

import { getPFPImage } from '@utils';

const usePFP = ({ name, address }) => {
    const [pfp, setPFP] = useState(' ');

    useEffect(() => {
        async function getImage() {
            const image = await getPFPImage(name, address);

            setPFP(image);
        }

        if (!name || !address) return

        getImage();
    }, [name, address]);

    return { pfp };
}

export { usePFP };