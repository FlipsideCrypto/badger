export const holderHeadRows = {
    address: {
        label: "Address",
        sortable: true,
        method: "",
    },
    receivedAt: {
        label: "Received At",
        sortable: true,
        method: "desc",
    },
    nickname: {
        label: "Nickname",
        sortable: true,
        method: "",
    },
    pod: {
        label: "Pod",
        sortable: true,
        method: "",
    },
    delegate: {
        label: "Delegate",
        sortable: true,
        method: "",
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