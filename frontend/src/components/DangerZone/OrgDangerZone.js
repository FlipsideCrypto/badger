import { useState } from "react";

import { FormActionBar, FormDrawer, Input } from "@components"


const OrgDangerZone = ({ orgAddress }) => {
    const [ newOwner, setNewOwner ] = useState("");

    const onArchive = async () => {
    
    }

    const onOwnerChange = (e) => {
        setNewOwner(e.target.value);
    }

    return (
        <>
            <h2>Danger zone</h2>

            <FormDrawer label="Ownership" open={true}>
                <Input label="Owner" value={newOwner} onChange={(e) => onOwnerChange(e)} />
            </FormDrawer>

            <FormActionBar
                actions={[{
                    text: "Update ownership",
                    className: "warning",
                    onClick: () => onArchive()
                }]}
            />
        </>
    )
}

export { OrgDangerZone }