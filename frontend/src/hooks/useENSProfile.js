import { useState, useMemo, useEffect } from "react";
import { ethers } from "ethers";

import { getPFPImage } from "@utils";

import { getRandomEmoji } from "@static";

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
            const seed = getRandomEmoji(address);
            const response = await getPFPImage(seed, address);

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