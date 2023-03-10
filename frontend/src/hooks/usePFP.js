import { useEffect, useState } from 'react';

import { getPFPImage } from '@utils';

const usePFP = ({ name, address }) => {
    const [characterPFP, setCharacterPFP] = useState(' ');

    const formattedName = name.charAt(0).toUpperCase();

    useEffect(() => {
        async function getImage() {
            const image = await getPFPImage(formattedName, address);

            setCharacterPFP(image);
        }

        if (!formattedName || !address) return
        getImage();
    }, [formattedName, address]);

    return { characterPFP };
}

export { usePFP };