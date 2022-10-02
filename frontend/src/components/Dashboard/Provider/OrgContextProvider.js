import { useState, createContext, useEffect } from "react"
import { API_URL } from "@static/constants/links"

export const OrgContext = createContext();

// TODO: Would it be better to have orgContext hold all fetched orgData?
//       And then have a separate context for the current org? 
//       Or a method to get out just an org with index?
const OrgContextProvider = ({ children }) => {
    const [ orgData, setOrgData ] = useState();
    const [ currentOrgId, setCurrentOrgId ] = useState();

    useEffect(() => {
        if (orgData?.id === currentOrgId) return

        try {
            fetch(`${API_URL}/organizations/${currentOrgId}/`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log('got org data', data);
                // TODO: Remove this, had to add it for testing while the API returns without an error
                if (data.detail === 'Not found.') data = {name: "dummy", id: currentOrgId, badges: []};
                setOrgData(data)
            })
            .catch(err => {
                console.error('Error getting org data', err);
            })
        } catch (err) {
            console.error('Error getting org data', err);
        }

    }, [currentOrgId, orgData, setOrgData])

    return (
        <OrgContext.Provider value={{orgData, setOrgData, currentOrgId, setCurrentOrgId }}>
            {children}
        </OrgContext.Provider>
    )
}

export default OrgContextProvider;