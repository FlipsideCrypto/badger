import { SignatureType, SiweMessage } from "siwe"
import { getCSRFToken } from "./helpers";

const API_URL = process.env.REACT_APP_API_URL;

export async function SIWELogin(message, signature) {
    let response;

    await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({ message, signature }),
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        response = data;
    })
    .catch(err => {
        response = {error: err};
    })

    return response;
};

export async function SIWENonce() {
    const url = `${API_URL}/api/auth/get-nonce`
    let response;

    await fetch(url, {
        method: "GET",
        headers: {},
        credentials: 'include',
        mode: 'cors',
    })
    .then(res => res.json())
    .then(res => response = res.nonce)
    .catch(err => {
        response = {error: err};
    })

    return response;
};

export async function SIWEAuthorize (signer, address, chainId) {
    try {
        const nonce = await SIWENonce();
    
        const statement = `By signing this message, Badger authenticates your address for API permissions and creates a web token tied to your address.\n\nOnce authenticated, your address will always have the permissions required to view all the data related to your address.\n\nDO NOT share your token in any form, as sharing it allows for anyone with it to view and change all your related organizations and badges.`;
    
        const message = new SiweMessage({
            domain: document.location.host,
            address,
            chainId: chainId,
            uri: document.location.origin,
            version: '1',
            statement: statement,
            type: SignatureType.PERSONAL_SIGNATURE,
            nonce
        });
    
        const signature = await signer.signMessage(message.prepareMessage());
    
        const res = await SIWELogin(message, signature);
    
        return res;
    }
    catch (err) {
        return {error: err};
    }
}

export async function getAuthenticationStatus() {
    let response;
    try {
        await fetch(`${API_URL}/wallets/authentication_status`, {
            method: "GET",
            headers: {
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include'
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
        response = {error: err}
    }

    return response;
}