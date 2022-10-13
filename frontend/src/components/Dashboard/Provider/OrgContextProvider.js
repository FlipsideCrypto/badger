import { useState, createContext, useContext, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import { getOrgRequest } from "@utils/api_requests";

export const OrgContext = createContext();

// TODO: Would it be better to have orgContext hold all fetched orgData?
//       And then have a separate context for the current org? 
//       Or a method to get out an individual org with index?
//       Will probably need to be able to memoize the orgData to decrease
//       loading times and reduce api calls.
const OrgContextProvider = ({ children }) => {
    const [ orgData, setOrgData ] = useState();
    const [ currentOrgId, setCurrentOrgId ] = useState();
    const { authenticationError, setAuthenticationError } = useContext(UserContext);
    const { pathname } = useLocation();

    // If we have a currentOrgId and the orgData is not that org's,
    // fetch it and set orgData.
    useEffect(() => {
        async function getData() {
            let response = await getOrgRequest(currentOrgId);

            if (response.detail === "Authentication credentials were not provided.") {
                setAuthenticationError(true);
                setOrgData({});
            }

            if (response?.id) {
                setOrgData(response);
            }
        }

        if (
            currentOrgId &&
            !authenticationError &&
            orgData?.id !== parseInt(currentOrgId)
        ) {
            getData();
        }
    }, [currentOrgId, orgData, authenticationError, setAuthenticationError])

    // Fetches the appropriate badge based on the current org id in the URL.
    useEffect(() => {
        // hacky way to get OrgId. TODO: Put sidebars and context providers inside of a 
        // base "/dashboard" route so that we can use useParams() to get the orgId.
        const path = pathname.split('/');
        const orgId = path.includes('organization') && !path.includes('organization/new') ? path[3] : null;

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