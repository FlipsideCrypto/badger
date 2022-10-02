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
        
        try {
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
        } catch (err) {
            console.log('error fetching user data', err);
            setUserData(placeholderUserData);
        }
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

        try {
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
            .catch(err => {
                console.error('Error getting org data', err);
                setOrgData(placeholderOrgData);
            })
        } catch (err) {
            console.error('Error getting org data', err);
            setOrgData(placeholderOrgData);
        }
    }, [id])

    return { orgData, setOrgData };
}