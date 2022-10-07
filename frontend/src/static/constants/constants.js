export const BADGER_ADDRESSES = {"Hardhat":"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"}
export const PRIMARY_PRODUCTION_CHAIN = "Hardhat"

export const holderHeadRows = {
    address: {
        label: "Address",
        sortable: true,
        method: "",
        width: "15%"
    },
    receivedAt: {
        label: "Received At",
        sortable: true,
        method: "desc",
        width: "20%"
    },
    nickname: {
        label: "Nickname",
        sortable: true,
        method: "",
        width: "20%"
    },
    pod: {
        label: "Pod",
        sortable: true,
        method: "",
        width: "35%"
    },
    delegate: {
        label: "Delegate",
        sortable: true,
        method: "",
        width: "10%"
    },
}

export const DummyBadgeData = {
    name: "Curator",
    holders: [
        {
            address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7278",
            receivedAt: "2022-01-01",
            nickname: "Mason",
            pod: "Operations",
            delegate: true
        },
        {
            address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7279",
            receivedAt: "2022-01-03",
            nickname: "Chance",
            pod: "Governance",
            delegate: false
        },
        {
            address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7270",
            receivedAt: "2022-01-02",
            nickname: "Drake",
            pod: "Contributor",
            delegate: false
        },
        {
            address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7271",
            receivedAt: "2022-01-02",
            nickname: "Drake",
            pod: "Contributor",
            delegate: false
        },
        {
            address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7273",
            receivedAt: "2022-01-02",
            nickname: "Drake",
            pod: "Contributor",
            delegate: true
        },
    ]
}