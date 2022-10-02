

export function getNewOrgDict(orgData, newOrg, orgId) {
    if (!orgData) {
        return [{id: orgId, badges: []}];
    }

    let prev = [...orgData];
    prev.push(orgData);

    return prev;
}