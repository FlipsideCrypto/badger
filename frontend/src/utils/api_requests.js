import { API_URL, IPFS_GATEWAY_URL } from "@static/constants/links"
import { cleanAddresses } from "./helpers";

const getCSRFToken = () => {
    return document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'))?.[2] || null;
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
            if (!data?.id) throw new Error("Org POST request failed");
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
    // Have to clean input addresses to match the API
    const users = badge.users?.length > 0 ? 
        badge.users.map(user => {
            if (user.ethereum_address)
                return user
            return {ethereum_address: user}
        })
        : [];

    const delegates = badge.delegates?.length > 0 ? 
        badge.delegates.map(delegate => {
            if (delegate.ethereum_address) 
                return delegate
            return {ethereum_address: delegate}
        })
        : [];

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

export async function postIPFSMetadata(obj) {
    let response;

    const metadata = {
        name: obj.name,
        description: obj.description,
        image: IPFS_GATEWAY_URL + obj.image_hash
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
            if (data.length < 1) throw new Error("No user data found");
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
            if (data.length < 1) throw new Error("No org data found");
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
    const users = cleanAddresses(badge.users);
    const delegates = cleanAddresses(badge.delegates);
    const organization = typeof(orgId) === "string" ? parseInt(orgId) : orgId;

    console.log('badge', badge)
    const data = {
        organization: organization,
        users: users,
        delegates: delegates
    }
    console.log('request body', data)

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
            response = data
        })
    }
    catch (err) {
        response = {error: err}
    }
    console.log('response', response)

    return response;
}