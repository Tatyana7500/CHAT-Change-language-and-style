const DAO = require('../../dao');
const config = require('../../../../config');
const mysql = require('mysql2');
const util = require('../../util');

const users = `create table if not exists users(
  _id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL)`;

function UsersDaoMySqlDB() {
    this.connection = null;
    this.model = null;
}

UsersDaoMySqlDB.prototype = Object.create(DAO.prototype);
UsersDaoMySqlDB.prototype.constructor = UsersDaoMySqlDB;

UsersDaoMySqlDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = config.settings.mysql;

    this.connection = mysql.createConnection(url).promise();
    this.connection.connect();
    this.connection.query(users);
};

UsersDaoMySqlDB.prototype.create = async function (obj) {
    await this.connection.query(`INSERT INTO users(name, email, password) VALUES('${obj.name}', '${obj.email}', '${obj.password}')`);
};

UsersDaoMySqlDB.prototype.readUser = async function (email, password) {
    const result = await this.connection.execute(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`);
    const user = result[0][0];

    return util.convertUser(user);
};

UsersDaoMySqlDB.prototype.readAll = async function () {
    const result = await this.connection.query('SELECT * FROM users');
    return util.convertUsers(result[0]);
};

UsersDaoMySqlDB.prototype.readUserToId = async function (id) {
    const result = await this.connection.query(`SELECT * FROM users WHERE _id=${parseInt(id)}`);
    return util.convertUsers(result[0]);
};

module.exports = UsersDaoMySqlDB;