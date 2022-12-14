export const badgeHeadRows = {
    name: {
        label: 'Badge',
        sortable: true,
        method: "",
        align: 'left',
        width: '40%',
    },
    holders: {
        label: 'Holders',
        sortable: true,
        method: "",
        align: 'right',
        width: '10%',
    },
    managers: { 
        label: 'Managers',
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
        width: '20%',
    }
}

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
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐คฃ",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐คฉ",
    "๐",
    "๐",
    "๐",
    "๐คช",
    "๐",
    "๐ค",
    "๐ค",
    "๐คญ",
    "๐คซ",
    "๐ค",
    "๐ค",
    "๐คจ",
    "๐",
    "๐ถ",
    "๐",
    "๐",
    "๐ฌ",
    "๐",
    "๐คค",
    "๐ด",
    "๐",
    "๐",
    "๐",
    "๐",
    "๐ฅ",
]

export const getRandomEmoji = (address) => {
    const char = address.charCodeAt(39) + address.charCodeAt(40);
    const randomIndex = char % pfpEmojis.length;
    return pfpEmojis[randomIndex];
}