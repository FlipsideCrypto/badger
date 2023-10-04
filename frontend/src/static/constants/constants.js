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

const CONTRACT_SLOTS = {
    BEFORE_FORFEIT: "0x4279a522786317da581eebbb5940c30b3f35c9249f7025aa9402e41f938a3e09",
    BEFORE_MINT: "0xfd130903f7e993641fb78383cfbfd0cbb85e8cd82c74361e6d973ff9070c741f", BEFORE_REVOKE: "0x8f814277fd68c4b9529a6563dc634db1da8f31cc86eae42fedf19e7ff6549714", BEFORE_SET_HOOK: "0x9267ca31dfa08e6482d75d2d7e8dd2a493dd988cc342c41c9fc33fc40fd0ddbd",
    BEFORE_TRANSFER: "0x844bb459abe62f824043e42caa262ad6859731fc48abd8966db11d779c0fe669"
}

export { 
    pfpEmojis,
    getRandomEmoji,
    CONTRACT_SLOTS
}