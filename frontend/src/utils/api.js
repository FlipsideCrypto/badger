import { formatAddresses, getCSRFToken, getFileFromBase64 } from "@utils";

import { IPFS_GATEWAY_URL } from "@static"

const API_URL = process.env.REACT_APP_API_URL;

async function postIPFSImage(image) {
    // If the image is already a hash, return it.
    if (typeof (image) === "string") return { hash: image };

    const formData = new FormData();
    formData.append('image', image)

    let response;

    try {
        await fetch(`${API_URL}/ipfs/pin-image/`, {
            method: "POST",
            mode: "cors",
            headers: {
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (!data.hash) throw new Error(
                    data.detail || "IPFS Image POST request failed"
                );
                response = data
            })
            .catch(error => {
                throw new Error(error);
            })
    }
    catch (err) {
        response = { error: err }
    }

    return response;
}

async function postIPFSMetadata(props) {
    const {
        name,
        description,
        image,
        attributes
    } = props;

    if (!name || !description || !image) return { error: "Missing required fields for IPFS metadata upload" };

    let response;

    const metadata = {
        name: name,
        description: description,
        image: IPFS_GATEWAY_URL + image,
    }

    if (attributes) {
        metadata.attributes = attributes;
    }

    try {
        await fetch(`${API_URL}/ipfs/pin-json/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include',
            body: JSON.stringify({ data: metadata })
        })
            .then(res => res.json())
            .then(data => {
                if (!data.hash) throw new Error(
                    data.detail || "IPFS Metadata POST request failed"
                );
                response = data
            })
            .catch(error => {
                throw new Error(error);
            })
    }
    catch (err) {
        response = { error: err }
    }

    return response;
}

async function getBadgeImage(orgName, orgAddress, badgeId, badgeName) {
    const url = `${API_URL}/art/pfp/${orgName}/${orgAddress}/${badgeName}/`
    const filename = `generated_${badgeName.replace(" ", "_")}_${badgeId}.svg`;

    let response;
    try {
        await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (!data) throw new Error(
                    "Badge image could not be created."
                );
                response = getFileFromBase64(data.image, filename);
            })
            .catch(err => {
                throw new Error(err);
            })
    }
    catch (err) {
        response = { error: err }
    }

    return response
}

async function getPFPImage(char, address) {
    let response;
    try {
        await fetch(`${API_URL}/art/pfp/${char}/${address}/`, {
            method: "GET",
            mode: "cors",
            headers: {
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (!data) throw new Error(
                    "PFP image could not be created."
                );
                response = getFileFromBase64(data.image, `generated_${char}_${address}.svg`);
            })
            .catch(err => {
                throw new Error(err);
            })
    }
    catch (err) {
        response = { error: err }
    }

    return response
}

export {
    postIPFSImage,
    postIPFSMetadata,
    getBadgeImage,
    getPFPImage
}