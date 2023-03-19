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
        align: 'left',
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

export { 
    pfpEmojis,
    getRandomEmoji
}