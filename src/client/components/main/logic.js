const getLocalStorage = () => {
    return localStorage.getItem('chat');
};

const removeLocalStorage = () => {
    localStorage.removeItem('chat');
};

const generateUrl = (chat, sender, receiver) => {
    return `http://localhost:8080/messages?chat=${chat}&sender=${sender}&receiver=${receiver}`;
};

module.exports = {
    getLocalStorage: getLocalStorage,
    removeLocalStorage: removeLocalStorage,
    generateUrl: generateUrl,
};