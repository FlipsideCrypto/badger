const pfpEmojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🤩",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😶",
    "😏",
    "🙄",
    "😬",
    "😌",
    "🤤",
    "😴",
    "🌟",
    "🚀",
    "🌙",
    "👑",
    "🔥",
]

const getRandomEmoji = (address) => {
    const char = address.charCodeAt(39) + address.charCodeAt(40);
    const randomIndex = char % pfpEmojis.length;
    return pfpEmojis[randomIndex];
}

const BADGE_HEAD_ROWS = {
    name: {
        label: 'Badge',
        sortable: true,
        method: "",
        align: 'left',
        width: '50%',
    },
    holders: {
        label: 'Holders',
        sortable: true,
        method: "",
        align: 'right',
        width: '10%',
    },
    updated: { 
        label: 'Last Updated',
        sortable: true,
        method: "",
        align: 'right',
        width: '40%',
    }
}

const HOLDER_HEAD_ROWS = {
    ethereum_address: {
        label: "Address",
        sortable: true,
        method: "",
        align: "left",
        width: "40%"
    },
    ens_name: {
        label: "ENS Name",
        sortable: true,
        method: "",
        align: "left",
        width: "40%"
    },
    holder: {
        label: "Holder",
        sortable: true,
        method: "",
        align: "center",
        width: "10%"
    },
    delegate: {
        label: "Manager",
        sortable: true,
        method: "",
        align: "center",
        width: "10%"
    },
}

const badgeDrawerSelectActions = [
    "Mint",
    "Revoke",
    // "Add Manager",
    // "Remove Manager"
]

export { 
    pfpEmojis,
    getRandomEmoji,
    BADGE_HEAD_ROWS,
    HOLDER_HEAD_ROWS,
    badgeDrawerSelectActions
}