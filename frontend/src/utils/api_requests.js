import { API_URL } from "@static/constants/links"

export async function postBadgeRequest(badge) {
    let response;

    try {
        await fetch(`${API_URL}/badges/}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            data: JSON.stringify(badge)
        })
        .then(res => res.json())
        .then(data => {
            console.log('got org response', data);
            if (!data?.id) throw new Error("Org POST request failed, id not found");
            response = data;
        })
        .catch(err => {
            throw new Error(err);
        })
    }
    catch (err) {
        console.log('error creating org', err);
        response = {error: err};
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
                'X-CSRFToken': document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'))[2],
            },
            credentials: 'include',
            data: JSON.stringify(org)
        })
        .then(res => res.json())
        .then(data => {
            console.log('got org response', data);
            if (!data?.id) throw new Error("Org POST request failed, id not found");
            response = data;
        })
        .catch(err => {
            throw new Error(err);
        })
    }
    catch (err) {
        console.log('error creating org', err);
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
            // cache: "no-cache",
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            if (data.length < 1) throw new Error("No user data found");
            console.log('got user data', data);
            response = data;
        })
        .catch(err => {
            console.log('error fetching user data', err);
            response = {error: err}
        })
    }
    catch (err) {
        throw new Error(err);
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
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.length < 1) throw new Error("No org data found");
            console.log('got user data', data);
            response = data;
        })
        .catch(err => {
            throw new Error(err);
        })
    }
    catch (err) {
        console.log('error fetching user data', err);
        response = {error: err}
    }

    return response
}

