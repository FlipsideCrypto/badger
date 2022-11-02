import { useState, useEffect } from "react";

const Hash = require("ipfs-only-hash");

export const useIPFSMetadataHash = (data) => {
    const [ hash, setHash ] = useState(null);

    useEffect(() => {
        async function getHash() {
            if (!data) return;
            
            const stringify = JSON.stringify(data);
            await Hash.of(stringify, {
                cidVersion: 0,
                onlyHash: true,
            })
            .then((res) => {
                setHash(res);
            })
            .catch((err) => {
                console.error('Error with deterministic metadata hashing', err);
            })
        }

        getHash();
    }, [data])

    return { hash };
}

export const useIPFSImageHash = (imageFile) => {
    const [ hash, setHash ] = useState(null);

    useEffect(() => {
        async function getHash(image) {
            if (!image) return;
            
            const reader = new FileReader();
            reader.onload = async () => {
                await Hash.of(reader.result, {
                    cidVersion: 0,
                    onlyHash: true,
                })
                .then((res) => {
                    setHash(res);
                })
                .catch((err) => {
                    console.error('Error with deterministic image hashing', err);
                })
            };

            reader.readAsText(image);
        }

        getHash(imageFile);
    }, [imageFile])

    return { hash };
}