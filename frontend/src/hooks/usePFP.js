import { useEffect, useState } from 'react';

import { getPFPImage } from '@utils';

const usePFP = ({ name }) => {
    const [characterPFP, setCharacterPFP] = useState(null);

    const formattedName = name.charAt(0).toUpperCase();

    useEffect(() => {
        async function getImage() {
            const image = await getPFPImage(formattedName);

            setCharacterPFP(image);
        }

        getImage();
    }, [formattedName]);

    return { characterPFP };
}

export { usePFP };