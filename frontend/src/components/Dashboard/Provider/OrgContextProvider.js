import { useState, createContext } from "react"
import { API_URL } from "@static/constants/links"

export const OrgContext = createContext();

// TODO: I think it would work best if we had an array of org objs and pushed to it
//       when an ID that has not been fetched before is passed in.
//       context meets memoization meets cache.
// TODO: would it also make sense to have the API call be present in here and guard it with
//       a check to see if the orgData is already present in the array?
// TODO: WHAT THE FUCK THERES AN INFINITE RERENDER
const OrgContextProvider = ({ children }) => {
    const [ orgData, setOrgData ] = useState();

    // TODO: Api POST in here?
    function addBadgeToOrg(badgeObj, orgId) {
        console.log("OrgContext: adding badge")
        if (!orgData) {
            setOrgData([{id: orgId, badges: [badgeObj]}]);
            return
        }
        const prev = [...orgData];
        const index = prev.findIndex((org) => org.id === orgId);

        if (prev[index].badges) 
            prev[index].badges.push(badgeObj);
        else 
            prev[index].badges = [badgeObj];

        setOrgData(prev);
    }

    async function getOrgData(orgId) {
        // if (index && orgData[index]) return orgData[index];
        console.log('Context provider: getOrgData');
        if (orgData?.badges) {
            const index = orgData.findIndex((org) => org.id === orgId);
            return index ? orgData[index] : null;
        }

        try {
            fetch(`${API_URL}/organizations/${orgId}/`, {
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
                if (data.detail === 'Not found.') data = null;
                addBadgeToOrg(data, orgId);
            })
            .catch(err => {
                console.error('Error getting org data', err);
            })
        } catch (err) {
            console.error('Error getting org data', err);
        }
    }

    return (
        <OrgContext.Provider value={{orgData, setOrgData, getOrgData, addBadgeToOrg}}>
            {children}
        </OrgContext.Provider>
    )
}

export default OrgContextProvider;