export const csvFileToArray = (file) => {
    const csvHeader = file.slice(0, file.indexOf("\n")).split(",");
    const csvRows = file.slice(file.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
            return values[index].replace(/\r/g,"");
        }, {});
        return obj;
    });

    return array;
};

export const sliceAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4)
}

export const compareByProperty = (property, direction, a, b) => {
    const inverse = direction === "desc" ? 1 : -1;
    if (a[property] > b[property]) return 1 * inverse;
    if (a[property] < b[property]) return -1 * inverse;
    return 0;
}

export const cleanAddresses = (addresses) => {
    return addresses.length > 0 ? 
        addresses.map(user => {
            if (user.ethereum_address)
                return user
            return {ethereum_address: user}
        })
        : [];
}

export const getCSRFToken = () => {
    let name = "csrftoken=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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