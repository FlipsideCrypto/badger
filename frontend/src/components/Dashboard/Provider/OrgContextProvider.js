import { useState, createContext, useContext, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import { initialOrgForm } from "@components/Dashboard/Form/FormReducer";

export const OrgContext = createContext();

const OrgContextProvider = ({ children }) => {
    const { userData, authenticatedAddress } = useContext(UserContext);
    const [ orgData, setOrgData ] = useState(initialOrgForm);
    const [ currentOrgId, setCurrentOrgId ] = useState();
    const { pathname } = useLocation();

    // When the path changes, check if the path is for an organization. If so, then
    // set the current org id to the id of the organization.
    useEffect(() => {
        const path = pathname.split('/');
        const orgId = path.includes('organization') && path[3] !== "new" ? path[3] : null;

        if (orgId && orgId !== currentOrgId) {
            setCurrentOrgId(orgId);
        }
    }, [pathname, currentOrgId, setCurrentOrgId])

    // If we have a currentOrgId and an authenticated address, parse the 
    // org data from the user data. If the org data is not owned by the user, 
    // then parse only the badges that they are a delegate or holder of.
    useEffect(() => {
        if (!currentOrgId || !authenticatedAddress) return;
        
        let org = userData?.organizations.find(
            org => org.id === parseInt(currentOrgId)
        );

        // if the user is not the owner of this org then we need to parse
        // out the badges they are not a delegate or holder of.
        if (org && org.owner.ethereum_address !== authenticatedAddress) {
            // Find the badges in org that are in userData.badges
            let badges = org.badges.filter(badge => {
                return userData?.badges.find(
                    userBadge => userBadge.id === badge.id
                )
            })

            org.badges = badges;
        }

        if (org) {
            // filter out the badges that are not active
            org.badges = org.badges.filter(badge => badge.is_active === true);
            setOrgData(org);
        }
        
    }, [userData, authenticatedAddress, currentOrgId])

    return (
        <OrgContext.Provider value={{ orgData, setOrgData, currentOrgId, setCurrentOrgId }}>
            {children}
        </OrgContext.Provider>
    )
}

export default OrgContextProvider;