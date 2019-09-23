const getLocalStorage = () => {
    return localStorage.getItem('chat');
};

const removeLocalStorage = () => {
    localStorage.removeItem('chat');
};

module.exports = {
    getLocalStorage: getLocalStorage,
    removeLocalStorage: removeLocalStorage,
};