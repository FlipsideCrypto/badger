import { useState, createContext, useContext, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { getOrgRequest } from "@utils/api_requests";
import { UserContext } from "./UserContextProvider";

export const OrgContext = createContext();

const OrgContextProvider = ({ children }) => {
    const [ orgData, setOrgData ] = useState();
    const { isAuthenticated } = useContext(UserContext);
    const [ currentOrgId, setCurrentOrgId ] = useState();
    const { pathname } = useLocation();

    // If we have a currentOrgId and the orgData is not that org's,
    // fetch it and set orgData.
    useEffect(() => {
        async function getData() {
            let response = await getOrgRequest(currentOrgId);
            if (response?.id) setOrgData(response);
        }

        if (
            isAuthenticated &&
            currentOrgId &&
            orgData?.id !== parseInt(currentOrgId)
        ) {
            getData();
        }
    }, [currentOrgId, orgData, isAuthenticated])

    // Fetches the appropriate badge based on the current org id in the URL.
    useEffect(() => {
        const path = pathname.split('/');
        const orgId = path.includes('organization') && path[3] !== "new" ? path[3] : null;

        if (orgId && orgId !== currentOrgId) {
            setCurrentOrgId(orgId);
        }
    }, [pathname, currentOrgId, setCurrentOrgId])

    return (
        <OrgContext.Provider value={{ orgData, setOrgData, currentOrgId, setCurrentOrgId }}>
            {children}
        </OrgContext.Provider>
    )
}

export default OrgContextProvider;