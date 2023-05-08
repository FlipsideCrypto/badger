import { ethers } from "ethers";

// Turns a CSV file of addresses into an array of each csv row.
const csvFileToArray = (file) => {
    const csvHeader = file.slice(0, file.indexOf("\n")).split(",");
    const csvRows = file.slice(file.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
        const values = i.split(",");

        const obj = csvHeader.reduce((object, header, index) => {
            return { ...object, [index]: values[index].replace(/\r/g, "") }
        }, {});

        return obj;
    });

    if (csvHeader[0].slice(0, 2) === "0x") {
        array.unshift(csvHeader[0].replace(/\r/g, ""));
    }
    return array;
};

const sliceAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4)
}

const compareByProperty = (property, direction, a, b) => {
    const inverse = direction === "desc" ? 1 : -1;
    if (a[property] > b[property]) return 1 * inverse;
    if (a[property] < b[property]) return -1 * inverse;
    return 0;
}

const formatName = (name) => {
    if (name.length === 0) return "Untitled";

    if (name.length > 18) return name.slice(0, 18) + "...";

    return name;
}

const formatAddresses = (addresses) => {
    return addresses?.length > 0 ?
        addresses.map(user => {
            if (user.ethereum_address) {
                user.ethereum_address = ethers.utils.getAddress(user.ethereum_address);
                return user
            }
            return { ethereum_address: ethers.utils.getAddress(user) }
        })
        : [];
}

const getCSRFToken = () => {
    let name = "csrftoken=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const getFileFromBase64 = (base64, filename) => {
    var pos = base64.indexOf(';base64,');
    var type = base64.substring(5, pos);
    var b64 = base64.substr(pos + 8);

    var imageContent = Buffer.from(b64, 'base64');

    return new File([imageContent], filename, { type: type });
}

const getTimeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    if (isNaN(seconds)) return

    var interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }

    return Math.floor(seconds) + " seconds";
}

export {
    csvFileToArray,
    sliceAddress,
    compareByProperty,
    formatName,
    formatAddresses,
    getCSRFToken,
    getFileFromBase64,
    getTimeSince
}