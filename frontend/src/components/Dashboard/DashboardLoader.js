import { useEffect, useMemo, useState } from "react";

import { ethers } from "ethers";

import { getProvider } from "@wagmi/core";

import { ActionButton, Empty } from "@components";

import { getBadgerAbi } from "@hooks";

const NotDeployedEmpty = () => <Empty
    title="There are no Organizations deployed at this address."
    body="Badger hasn't detected any Organizations at this address yet. If you are sure you are in the correct place, please give us a few minutes to check the chain."
    button={<ActionButton
        className="secondary"
        afterText="Check the chain"
        icon={['fal', 'eye']}
    />}
/>

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
            {/* The object is good to go */}
            {!isLoading && children}

            {isLoading && <>
                <div className="loading big" />
                <div className="loading big" />

                <div className="loading short" />

                {/* The object does not exist but we have seen it onchain */}
                {isDeployed && <NotIndexedEmpty />}

                {/* The object does not exist onchain */}
                {!isDeployed && <NotDeployedEmpty />}
            </>}
        </>
    )
}

export { DashboardLoader };