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

function conversionMessages(obj) {
    let messages = [];

    for (let i = 0; i < obj.length; i++) {
        const message = { _id: obj[i]._id, message: obj[i].message, sender: obj[i].sender, receiver: obj[i].receiver, date: obj[i].date };
        messages.push(message);
    }

    return messages;
}

function conversionUsers(obj) {
    let users = [];

    for (let i = 0; i < obj.length; i++) {
        const user = { _id: obj[i]._id, name: obj[i].name, email: obj[i].email, password: obj[i].password };
        users.push(user);
    }

    return users;
}

function conversionUser(obj) {
    let user;

    for (let i = 0; i < obj.length; i++) {
        user = { _id: obj[i]._id, name: obj[i].name, email: obj[i].email, password: obj[i].password };
    }

    return user;
}

module.exports = {
    dynamicSort: dynamicSort,
    conversionMessages: conversionMessages,
    conversionUsers: conversionUsers,
    conversionUser: conversionUser,
};