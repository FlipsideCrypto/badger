import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const placeholderUserData = {
    address: "0x0000000000000000000000000000000000000000",
    ens_name: "",
    organizations: [],
}
export const useUserData = (address) => {
    const [ userData, setUserData ] = useState();
    
    useEffect(() => {
        if (!address) return void {};
        
        fetch(`${API_URL}/users/by-address/${address}/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log('got user data', data);
            setUserData(data[0]);
        })
        .catch(err => {
            console.log('error fetching user data', err);
            setUserData(placeholderUserData);
        })
    }, [address])

    return { userData, setUserData };
}

const placeholderOrgData = {
    active: false,
    chain: "ethereum",
    name: "Org Name",
    symbol: "Org Symbol",
    description: 'This is a super cool description.',
    image_hash: '',
    contract_uri_hash: '',
    contract_address: ''
}
export const useOrgData = (id) => {
    const [ orgData, setOrgData ] = useState();
    
    useEffect(() => {
        if (!id) return void {};

        fetch(`${API_URL}/organizations/${id}/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log('got org data', data);
            setOrgData(data);
        })
        .catch(error => {
            console.error('Error getting org data', error);
            setOrgData(placeholderOrgData);
        })
    }, [id])

    return { orgData, setOrgData };
}

export const createOrganization = (org) => {
    fetch(`${API_URL}/organizations/}/`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            name: org.orgName,
            symbol: org.orgSymbol,
            owner: org.address,
            chain: org.chain,
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log('got org response', data);
    })
}