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

const setToLocalStorage = (data) => {
    if (data) {
        localStorage.setItem('chat', JSON.stringify(data));
        window.location.href = '/main';
    }
};

const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('chat'));
};

const goToLogin = () => {
    window.location.href = '/login';
};

module.exports = {
    sendGetRequest: sendGet,
    sendPostRequest: sendPost,
    setToLocalStorage: setToLocalStorage,
    getLocalStorage: getLocalStorage,
    goToLogin: goToLogin,
};