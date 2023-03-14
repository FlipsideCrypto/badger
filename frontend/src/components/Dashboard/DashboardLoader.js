import { useEffect, useState } from "react";

import { ethers } from "ethers";

import { getProvider } from "@wagmi/core";

import { ActionButton, Empty } from "@components";

import { getBadgerAbi } from "@hooks";

const NotDeployedEmpty = ({ badgeId }) => {
    const title = badgeId ? "A Badge with this does not exist." : "There are no Organizations deployed at this address.";
    const body = badgeId ? "Badger hasn't detected setup of a Badge with this token ID yet. If you are sure you are in the correct place, please give us a few minutes to check the chain." : "Badger hasn't detected any Organizations at this address yet. If you are sure you are in the correct place, please give us a few minutes to check the chain."

    return (
        < Empty
            title={title}
            body={body}
            button={< ActionButton
                className="secondary"
                afterText="Check the chain"
                icon={['fal', 'eye']}
            />}
        />
    )
}

const NotIndexedEmpty = () => <Empty
    title="We are building your Organization. Just one moment please!"
    body="Badger is still indexing your Organization. Please give us a few minutes to check the chain and get everything in order."
    button={<ActionButton
        className="primary"
        afterText="Read the docs"
        icon={['fal', 'books']}
        link="http://docs.trybadger.com"
    />}
/>

const DashboardLoader = ({ chainId, orgAddress, badgeId, obj, children }) => {
    const [logs, setLogs] = useState([]);

    const isLoading = obj === undefined;

    useEffect(() => {
        const getFilter = ({ ethereum_address }) => {
            if (!badgeId) return {
                address: ethereum_address,
                topics: [
                    ethers.utils.id("OrganizationCreated(address,address,uint256)"),
                    ethers.utils.hexZeroPad(orgAddress, 32)
                ],
                fromBlock: 0,
                toBlock: "pending"
            }

            return {
                address: ethereum_address,
                topics: [
                    ethers.utils.id("URI(string,uint256)"),
                    null,
                    ethers.utils.hexZeroPad(badgeId, 32)
                ],
                fromBlock: 0,
                toBlock: "pending"
            }
        }

        const getLogs = () => {
            const address = orgAddress || getBadgerAbi(chainId).address;

            const filter = getFilter({ ethereum_address: address });

            const provider = getProvider(chainId);

            provider.getLogs(filter)
                .then(logs => {
                    setLogs(logs);
                    console.log("logs: ", logs)
                });
        }

        getLogs();
    }, [])

    const isDeployed = logs.length > 0;

    return (
        <>
            {!isLoading && children}

            {isLoading && <>
                <div className="loading big" />
                <div className="loading big" />

                <div className="loading short" />

                {isDeployed && <NotIndexedEmpty />}

                {!isDeployed && <NotDeployedEmpty />}
            </>}
        </>
    )
}

export { DashboardLoader };