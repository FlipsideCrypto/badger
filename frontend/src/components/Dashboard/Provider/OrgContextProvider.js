import { useState, createContext, useEffect } from "react"
import { getOrgRequest } from "@utils/api_requests";

export const OrgContext = createContext();

// TODO: Would it be better to have orgContext hold all fetched orgData?
//       And then have a separate context for the current org? 
//       Or a method to get out just an org with index?
const OrgContextProvider = ({ children }) => {
    const [ orgData, setOrgData ] = useState();
    const [ currentOrgId, setCurrentOrgId ] = useState();

    useEffect(() => {
        if (
            !currentOrgId ||
            orgData?.id === parseInt(currentOrgId)
        ) return void {}

        async function getData() {
            let response = await getOrgRequest(currentOrgId);

            if (response?.id) {
                setOrgData(response);
            }
        }

        getData();
    }, [currentOrgId, orgData])

    return (
        <OrgContext.Provider value={{ orgData, setOrgData, currentOrgId, setCurrentOrgId }}>
            {children}
        </OrgContext.Provider>
    )
}

export default OrgContextProvider;