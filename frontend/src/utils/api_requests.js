import { IPFS_GATEWAY_URL } from "@static/constants/links"
import { formatAddresses, getCSRFToken, getFileFromBase64 } from "./helpers";

const API_URL = process.env.REACT_APP_API_URL;

export async function postFeedbackRequest(feedback) { 
    let response;

    try {
        await fetch(`${API_URL}/feedback/`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include',
            body: JSON.stringify(feedback)
        })
        .then(res => res.json())
        .then(data => { 
            if(!data?.id) throw new Error(
                data.detail || "Feedback POST request failed"
            );
            response = data;
        })
        .catch(err => { 
            throw new Error(err);
        })
    }
    catch(err) { 
        response = { error: err };
    }

    return response;
}

export async function postOrgRequest(org) {
    let response;

    try {
        await fetch(`${API_URL}/organizations/`, {
            method: "POST",
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
        response = {error: err}
    }

    return response;
}

export async function postBadgeRequest(badge) {
    let response;
    
    const users = formatAddresses(badge.users);
    const delegates = formatAddresses(badge.delegates);

    const organization = typeof(badge?.organization) === "string" ? 
          parseInt(badge?.organization) 
        : badge?.organization;

    const badgeData = {
        is_active: true,
        name: badge.name,
        description: badge.description,
        token_id: badge.token_id,
        image_hash: badge.image_hash,
        token_uri: badge.token_uri,
        account_bound: badge.account_bound,
        signer_ethereum_address: "",
        users: users,
        delegates: delegates,
        organization: organization
    }

    try {
        await fetch(`${API_URL}/badges/`, {
            method: "POST",
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
        response = {error: err};
    }

    return response;
}

export async function postIPFSImage(image) {
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
        response = {error: err}
    }

    return response;
}

export async function postIPFSMetadata(props) {
    const {
        name,
        description,
        imageHash,
        attributes
    } = props;
    
    let response;

    const metadata = {
        name: name,
        description: description,
        image: IPFS_GATEWAY_URL + imageHash,
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
            body: JSON.stringify({data: metadata})
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
        response = {error: err}
    }

    return response;
}

export async function getUserRequest(address) {
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
        response = {error: err};
    }

    return response;
}

export async function getOrgRequest(orgId) {
    let response;
    try {
        await fetch(`${API_URL}/organizations/${orgId}`, {
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
        response = {error: err}
    }

    return response
}

export async function putBadgeRolesRequest(badge, orgId) {
    let response;

    // Have to clean input addresses to match the API
    const users = formatAddresses(badge.users);
    const delegates = formatAddresses(badge.delegates);
    const organization = typeof(orgId) === "string" ? parseInt(orgId) : orgId;

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
        response = {error: err}
    }

    return response;
}

export async function getBadgeImage(orgName, orgAddress, badgeId, badgeName) {
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
        response = {error: err}
    }

    return response
}

export async function getPFPImage(char, address) {
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
        response = {error: err}
    }

    return response
}