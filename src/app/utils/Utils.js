module.exports = function groupBy(list, prop) {
    const value = list.reduce(function (auxList, item) {
        const key = item[prop];
        auxList[key] = (auxList[key] || []).concat(item);

        return auxList;
    }, {});

    return value;
};
