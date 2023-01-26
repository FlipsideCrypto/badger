import { SignatureType, SiweMessage } from "siwe";
import { getCSRFToken } from "./helpers";
import { ERRORS } from "@static";

const API_URL = process.env.REACT_APP_API_URL;

// Retrieves the nonce to be used for the SIWE message, as well as the CSRF necessary for further calls.
async function getNonce() {
    const response = await fetch(`${API_URL}/api/auth/get-nonce`, {
        method: "GET",
        headers: {},
        credentials: 'include',
        mode: 'cors',
    });

    if (response.ok) return response.json();

    throw new Error(ERRORS["API_NONCE_FAILED"]);
};

async function getAuthenticationMessage(address, chainId) {
    try {
        const nonce = await getNonce();

        const statement = `By signing this message, Badger authenticates your address for API permissions and creates a web token tied to your address.\n\nOnce authenticated, your address will always have the permissions required to view all the data related to your address.\n\nDO NOT share your token in any form, as sharing it allows for anyone with it to view and change all your related organizations and badges.`;

        const message = new SiweMessage({
            domain: document.location.host,
            address,
            chainId: chainId,
            uri: document.location.origin,
            version: '1',
            statement: statement,
            type: SignatureType.PERSONAL_SIGNATURE,
            nonce: nonce.nonce,
        });

        return { message };
    } catch (e) {
        throw new Error(ERRORS["SIGNATURE_REJECTED"]);
    }
}

async function getAuthentication(message, signature) {
    const csrfToken = getCSRFToken();

    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ message, signature }),
        credentials: 'include'
    })

    if (response.ok) return response.json();

    throw new Error(ERRORS["API_AUTHENTICATION_FAILED"]);
};


async function getAuthenticationStatus() {
    const csrfToken = getCSRFToken();

    if (!csrfToken) throw new Error(ERRORS["API_CSRF_TOKEN_NOT_FOUND"]);

    const response = await fetch(`${API_URL}/wallets/authentication_status`, {
        method: "GET",
        headers: {
            'X-CSRFToken': csrfToken,
        },
        credentials: 'include'
    })

    if (response.ok) {
        return response.json()
    }

    throw new Error(ERRORS["API_AUTHENTICATION_FAILED"]);
}

export {
    getNonce,
    getAuthentication,
    getAuthenticationMessage,
    getAuthenticationStatus,
}