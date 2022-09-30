import { useState } from "react";

export const useUserData = (address) => {
    const [ userData, setUserData ] = useState();
    
    if (!address) return {};

    fetch(`http://localhost:8000/users/?address=${address}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log('User Data', data);
        setUserData(data[0]);
    })

    return { userData, setUserData };
}

export const useOrganizationData = (id) => {
    const [ organizationData, setOrganizationData ] = useState();
    
    if (!id) return {};

    fetch(`http://localhost:8000/organizations/?id=${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log('Org Data', data);
        setOrganizationData(data[0]);
    })

    return { organizationData, setOrganizationData };
}