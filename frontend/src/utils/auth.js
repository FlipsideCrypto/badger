import { SignatureType, SiweMessage } from "siwe"
import { API_URL } from "@static/constants/links"

export async function SIWELogin(message, signature) {
    let response;

    await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'))[2],
        },
        body: JSON.stringify({ message, signature }),
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        response = data;
    })
    .catch(err => {
        response = err;
    })
    console.log('login response', response);

    return response;
};

export async function SIWENonce() {
    const url = `${API_URL}/api/auth/nonce`
    let response;

    await fetch(url, {
        method: "GET",
        headers: {},
        credentials: 'same-origin',
        mode: 'cors',
    })
    .then(res => res.json())
    .then(res => response = res.nonce)
    .catch(err => {
        console.log('Error getting nonce', err);
    })

    console.log('got nonce', response);
    return response;
};

export async function SIWEAuthorize (signer, address, chainId) {
    try {
        const nonce = await SIWENonce();
    
        const statement = `By signing this one-time message, Badger authenticates your address for API permissions and creates a web token tied to your address.\n\nOnce authenticated, your address will always have the permissions required to view all the data related to your address, and you should never have to sign in again.\n\nDO NOT share your token in any form, as sharing it allows for anyone with it to view and change all your related organizations and badges.`;
    
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
        console.log('Error with SIWE', err);
        return err;
    }
}