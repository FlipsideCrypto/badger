import { useState, useMemo, useEffect } from "react";
import { ethers } from "ethers";

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;

export const useEnsProfile = (address) => {
    const [ ensName, setEnsName ] = useState(null);
    const [ ensAvatar, setEnsAvatar ] = useState(null);
    const [ isFetched, setIsFetched ] = useState(false);
    const provider = useMemo(() => {
        return new ethers.providers.AlchemyProvider("homestead", ALCHEMY_API_KEY);
    }, []);

    useEffect(() => {
        const getEnsInfo = async (address) => {
            if (!address) return;

            const name = await provider.lookupAddress(address);
            const avatar = await provider.getAvatar(name);
            setEnsName(name)
            setEnsAvatar(avatar);
            setIsFetched(true)
        }

        getEnsInfo(address);
    }, [address, provider])

    return { ensName, ensAvatar, isFetched }
}