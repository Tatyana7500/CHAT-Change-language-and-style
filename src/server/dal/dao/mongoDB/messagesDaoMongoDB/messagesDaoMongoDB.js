const DAO = require('../../dao');
const config = require('../../../../config');
const mongoose = require('mongoose');
const util = require('../../util');

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    date: { type: Number, required: true },
});

function MessagesDaoMongoDB() {
    this.connection = null;
    this.model = null;
}

MessagesDaoMongoDB.prototype = Object.create(DAO.prototype);
MessagesDaoMongoDB.prototype.constructor = MessagesDaoMongoDB;

MessagesDaoMongoDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = `${config.settings.mongo.connectionString}/chatDB`;

    mongoose.createConnection(url)
        .then(connection => {
            this.connection = connection;
            this.model = connection.model('message', messageSchema);
        })
        .catch((error) => {
            console.error(error);
        });
};

MessagesDaoMongoDB.prototype.create = async function (object) {
    const message = this.model(object);
    await message.save();
};

MessagesDaoMongoDB.prototype.readByReceiver = async function (receiver) {
    return await this.model.find({ receiver });
};

MessagesDaoMongoDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
    const sent = await this.model.find({ sender, receiver });
    const received = await this.model.find({ sender: receiver, receiver: sender });
    const messages = [...sent, ...received];
    messages.sort(util.dynamicSort('date'));

    return messages;
};

module.exports = MessagesDaoMongoDB;