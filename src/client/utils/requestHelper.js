const constants = require('../../constants');

const sendPost = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response;
};

const sendGet = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return await data;
};

const drawOnline = (id, arr) => {
    return arr.includes(id) ? constants.ONLINE : constants.OFFLINE;
};

module.exports = {
    drawOnline: drawOnline,
    sendGetRequest: sendGet,
    sendPostRequest: sendPost,
};