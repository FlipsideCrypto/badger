import { useState, useEffect } from "react";
import { IPFS_GATEWAY_URL } from "@static/constants/links"

const Hash = require("ipfs-only-hash");

export const useIPFSMetadataHash = (data) => {
    const [ hash, setHash ] = useState(null);

    useEffect(() => {
        async function getHash() {
            if (!data) return;
            
            const stringify = JSON.stringify({
                ...data, 
                image: IPFS_GATEWAY_URL + data.image
            });
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
                var uint8Array = new Uint8Array(reader.result);
                await Hash.of(uint8Array, {
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

            reader.readAsArrayBuffer(image);
        }

        getHash(imageFile);
    }, [imageFile])

    return { hash };
}