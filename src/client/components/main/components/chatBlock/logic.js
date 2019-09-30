const parseDate = (date) => {
    return new Date(parseInt(date)).toTimeString().slice(0, 8);
};

module.exports = {
    parseDate: parseDate,
};