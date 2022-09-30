import { useState, createContext } from "react"

export const OrgContext = createContext();

// TODO: I think it would work best if we had an array of org objs and pushed to it
//       when an ID that has not been fetched before is passed in.
//       context meets memoization meets cache.
// TODO: would it also make sense to have the API call be present in here and guard it with
//       a check to see if the orgData is already present in the array?
const OrgContextProvider = ({ children }) => {
    const [ orgData, setOrgData ] = useState();

    return (
        <OrgContext.Provider value={{orgData, setOrgData}}>
            {children}
        </OrgContext.Provider>
    )
}

export default OrgContextProvider;