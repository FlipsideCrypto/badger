import { ethers } from "ethers";

import { formatAddresses, getCSRFToken, getFileFromBase64 } from "@utils";

import { IPFS_GATEWAY_URL } from "@static"

const API_URL = process.env.REACT_APP_API_URL;

async function postOrgRequest(org) {
    let response;
    const url = org?.url ? org.url : `${API_URL}/organizations/`;
    const method = org?.id ? 'PATCH' : 'POST';

    try {
        await fetch(url, {
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include',
            body: JSON.stringify(org)
        })
            .then(res => res.json())
            .then(data => {
                if (!data?.id) throw new Error(
                    data.detail || "Org POST request failed"
                );
                response = data;
            })
            .catch(err => {
                throw new Error(err);
            })
    }
    catch (err) {
        response = { error: err }
    }

    return response;
}

async function postBadgeRequest(badge) {
    let response;

    const users = formatAddresses(badge.users);
    const delegates = formatAddresses(badge.delegates);
    const signer = badge.signer === "" ? "" : ethers.utils.getAddress(badge.signer);

    const organization = typeof (badge?.organization) === "string" ?
        parseInt(badge?.organization)
        : badge?.organization;

    const badgeData = {
        ...badge,
        is_active: true,
        signer_ethereum_address: signer,
        users: users,
        delegates: delegates,
        organization: organization
    }

    const url = badge.url ? badge.url : `${API_URL}/badges/`;
    const method = badge?.id ? 'PATCH' : 'POST';

    try {
        await fetch(url, {
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include',
            body: JSON.stringify(badgeData)
        })
            .then(res => res.json())
            .then(data => {
                if (!data?.id) throw new Error(
                    data.detail ||
                    "Badge POST request failed"
                );
                response = data;
            })
            .catch(err => {
                throw new Error(err);
            })
    }
    catch (err) {
        response = { error: err };
    }

    return response;
}

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

async function getUserRequest(address) {
    let response;
    try {
        await fetch(`${API_URL}/wallets/${address}/`, {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'X-CSRFToken': getCSRFToken(),
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length < 1) throw new Error(
                    data.detail || "No user data found"
                );
                response = data;
            })
            .catch(err => {
                throw new Error(err)
            })
    }
    catch (err) {
        response = { error: err };
    }

    return response;
}

async function getOrgRequest(orgId) {
    let response;
    try {
        await fetch(`${API_URL}/organizations/${orgId}/`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.length < 1) throw new Error(
                    data.detail || "No org data found"
                );
                response = data;
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

async function putBadgeRolesRequest(badge, orgId) {
    let response;

    // Have to clean input addresses to match the API
    const users = formatAddresses(badge.users);
    const delegates = formatAddresses(badge.delegates);
    const organization = typeof (orgId) === "string" ? parseInt(orgId) : orgId;

    const data = {
        organization: organization,
        users: users,
        delegates: delegates
    }

    try {
        await fetch(`${badge.url}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (!data?.id) throw new Error(
                    data.detail || "Badge PUT request failed"
                );

                response = data
            })
    }
    catch (err) {
        response = { error: err }
    }

    return response;
}

async function getBadgeImage(orgName, orgAddress, badgeId, badgeName) {
    const url = `${API_URL}/art/badge?organization=${orgName}&organization_ethereum_address=${orgAddress}&badge_id=${badgeId}&badge_name=${badgeName}`

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
                response = getFileFromBase64(data.image, `generated_${badgeName.replace(" ", "_")}_${badgeId}.svg`);
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
        await fetch(`${API_URL}/art/pfp/?char=${char}&address=${address}`, {
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

// TODO: Remove this once attributes are stored in the API
async function getAttributesFromHash(hash) {
    const url = `${IPFS_GATEWAY_URL}${hash}`;

    let response;
    try {
        await fetch(url, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                if (!data) throw new Error(
                    "Attributes could not be retrieved."
                );
                response = data.attributes;
            })
            .catch(err => {
                throw new Error(err);
            })
    }
    catch (err) {
        response = { error: err }
    }

    return response;
}

async function patchModelType(type, obj) {
    let response;
    try {
        await fetch(`${API_URL}/${type}/${obj.id}/`, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include',
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => {
                if (!data) throw new Error(
                    `${type} could not be archived.`
                );
                response = data;
            })
            .catch(err => {
                throw new Error(err);
            })
    }
    catch (err) {
        response = { error: err }
    }

    return response;
}

export {
    postOrgRequest,
    postBadgeRequest,
    postIPFSImage,
    postIPFSMetadata,
    getUserRequest,
    getOrgRequest,
    putBadgeRolesRequest,
    getBadgeImage,
    getPFPImage,
    getAttributesFromHash,
    patchModelType,
}