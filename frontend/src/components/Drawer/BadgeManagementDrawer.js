import { useState } from "react";

import { useManageHolders } from "@hooks";

import { ActionButton, InputListAddressAmountCSV, Select } from "@components";

const BadgeManagementDrawer = ({ drawer, badge, org, setDrawer }) => {
    const [addressAmounts, setAddressAmounts] = useState({
        addresses: [],
        amounts: []
    })

    const { openHolderTransaction, isPrepared, isLoading } = useManageHolders({
        obj: {
            addresses: addressAmounts.addresses,
            amounts: addressAmounts.amounts,
            tokenId: badge.token_id,
        },
        functionName: drawer.action.toLowerCase()
    });

    const onTransaction = async () => {
        await openHolderTransaction({
            onSuccess: ({ receipt }) => {
                // Reset the form.
                setAddressAmounts({
                    addresses: [],
                    amounts: []
                })
                console.log('receipt', receipt)
            },
            onError: (e) => {
                console.error(e)
            }
        });
    }

    return (
        <>
            <Select label="Update Type" options={["Mint", "Revoke"]}
                value={drawer.action} setValue={(e) => setDrawer({ ...drawer, action: e.target.value })} />

            <InputListAddressAmountCSV
                label={"Holders to Update"}
                obj={addressAmounts}
                setObj={setAddressAmounts}
            />

            <ActionButton
                beforeText={drawer.action === "Mint" ? "Mint Badges" : "Revoke Badges"}
                icon={['fal', 'arrow-right']}
                onClick={onTransaction}
                style={{ margin: "20px 0px 20px auto" }}
                loading={isLoading}
                disabled={!isPrepared}
            />
        </>
    )
}

export { BadgeManagementDrawer }