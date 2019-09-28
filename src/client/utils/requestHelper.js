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

const drawOnline = (id) => {
    const cards = document.querySelectorAll('.users__card');
    cards.forEach(card => {
        card.style.backgroundColor = id.includes(card.id) ? '#000000' : '#cccccc';
    });
    // return arr.includes(id) ? constants.ONLINE : constants.OFFLINE;
};

export default {
    drawOnline: drawOnline,
    sendGetRequest: sendGet,
    sendPostRequest: sendPost,
};