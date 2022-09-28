export const holderHeadRows = [
    {
        id: "address",
        label: "Address",
        sortable: true,
    },
    {
        id: "receivedAt",
        label: "Received At",
        sortable: true,
    },
    {
        id: "nickname",
        label: "Nickname",
        sortable: true,
    },
    {
        id: "pod",
        label: "Pod",
        sortable: true,
    },
    {
        id: "delegate",
        label: "Delegate",
        sortable: true,
    },
]

export const holderSortingDefaults = [
    {
        property: "address",
        method: "desc",
        priority: 0
    },
    {
        property: "nickname",
        method: "desc",
        priority: 0
    },
    {
        property: "pod",
        method: "desc",
        priority: 0
    },
    {
        property: "delegate",
        method: "asc",
        priority: 1
    },
    {
        property: "receivedAt",
        method: "desc",
        priority: 2,
    },
]