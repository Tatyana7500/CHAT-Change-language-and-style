const setToLocalStorage = (data) => {
    if (data) {
        localStorage.setItem('chat', JSON.stringify(data));
    }
};

module.exports = {
    setToLocalStorage: setToLocalStorage,
};