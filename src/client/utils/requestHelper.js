export const sendPost = async (url, data) => {
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

export const sendGet = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return await data;
};

export default {
    sendGet,
    sendPost,
};