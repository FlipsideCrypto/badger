import { useEffect, useState } from 'react';

import { useDebounce } from '@hooks';

import { getPFPImage } from '@utils';

const usePFP = ({ name, address }) => {
    const [characterPFP, setCharacterPFP] = useState(' ');

    const debouncedName = useDebounce(name, 300);

    const formattedName = debouncedName.charAt(0).toUpperCase();

    useEffect(() => {
        async function getImage() {
            const image = await getPFPImage(name, address);

            setCharacterPFP(image);
        }

        if (!formattedName || !address) return
        getImage();
    }, [formattedName, address]);

    return { characterPFP };
}

export { usePFP };