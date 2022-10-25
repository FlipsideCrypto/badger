export const holderHeadRows = {
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

export const pfpEmojis = [
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

export const getRandomEmoji = (address) => {
    const char = address.charCodeAt(39) + address.charCodeAt(40);
    const randomIndex = char % pfpEmojis.length;
    return pfpEmojis[randomIndex];
}