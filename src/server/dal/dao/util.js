function dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

        return result * sortOrder;
    };
}

function convertMessages(obj) {
    let messages = [];

    for (let i = 0; i < obj.length; i++) {
        const message = { _id: obj[i]._id, message: obj[i].message, sender: obj[i].sender, receiver: obj[i].receiver, date: obj[i].date };
        messages.push(message);
    }

    return messages;
}

function convertUsers(list) {
    let users = [];

    for (let i = 0; i < list.length; i++) {
        const user = convertUser(list[i]);
        users.push(user);
    }

    return users;
}

function convertUser(obj) {
    return { _id: (obj._id).toString(), name: obj.name, email: obj.email, password: obj.password };
}

module.exports = {
    dynamicSort: dynamicSort,
    convertUser: convertUser,
    convertUsers: convertUsers,
    convertMessages: convertMessages,
};