import { useState, useMemo, useEffect } from "react";
import { ethers } from "ethers";

import { getPFPImage } from "@utils";

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;

const useENSProfile = (address) => {
    const [ensName, setEnsName] = useState(null);
    const [ensAvatar, setEnsAvatar] = useState(null);
    const [isFetched, setIsFetched] = useState(false);

    const provider = useMemo(() => {
        return new ethers.providers.AlchemyProvider("homestead", ALCHEMY_API_KEY);
    }, []);

    useEffect(() => {
        const getGeneratedAvatar = async (address) => {
            // Emojis no longer supported by the api, so what do we use for personal pfps instead?
            const firstChar = ensName ? ensName.charAt(0).toUpperCase() : 'x';
            const response = await getPFPImage(firstChar, address);

            if (response.error) return;
            return URL.createObjectURL(response);
        }

        const getEnsInfo = async (address) => {
            if (!address || !provider) return;
            let avatar;

            const name = await provider.lookupAddress(address);
            setEnsName(name)
            if (name)
                avatar = await provider.getAvatar(name);

            if (!avatar)
                avatar = await getGeneratedAvatar(address);

            setEnsAvatar(avatar);
            setIsFetched(true)
        }

        getEnsInfo(address);
    }, [address, provider])

    return { ensName, ensAvatar, isFetched }
}

export { useENSProfile }