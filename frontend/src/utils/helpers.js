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