import { useEffect, useState } from "react";
import { API_URL } from "@static/constants/links";

export const useUserData = (address) => {
    const [ userData, setUserData ] = useState();
    
    useEffect(() => {
        if (!address) return {};
        
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
    }, [address])

    return { userData, setUserData };
}

export const useOrganizationData = (id) => {
    const [ organizationData, setOrganizationData ] = useState();
    
    useEffect(() => {
        if (!id) return {};

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
            setOrganizationData(data);
        })
    }, [id])

    return { organizationData, setOrganizationData };
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