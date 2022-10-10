import { useState, createContext, useContext, useEffect } from "react"
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

    useEffect(() => {
        if (authenticationError) {
            setAuthenticationError(true);
        }
    }, [authenticationError, setAuthenticationError])

    return (
        <OrgContext.Provider value={{ orgData, setOrgData, currentOrgId, setCurrentOrgId }}>
            {children}
        </OrgContext.Provider>
    )
}

export default OrgContextProvider;