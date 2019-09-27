const socket = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');
const constants = require('../constants');
const ChatDAL = require('./dal/chatDAL');
const cors = require('cors');
const jsonParser = bodyParser.json();

const app = express();
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const server = app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

const io = socket(server);

const chatDal = new ChatDAL();
chatDal.initialize();

function Client(userId, socketId) {
    this.userId = userId;
    this.socketId = socketId;
}

const clients = [];

io.sockets.on('connection', socket => {
    socket.on(constants.MESSAGE, handleMessage);
    socket.on(constants.ONLINE, (res) => {
       clients.push(new Client(res, socket.id));
    });
    socket.broadcast.emit(constants.ONLINE, clients);
});

async function handleDisconnect(socket) {
    const client = clients.find(item => item.socketId === socket.id);
    const index = clients.indexOf(client);

    if (index > -1) {
        clients.splice(index, 1);
        io.sockets.emit(constants.ONLINE, clients.map(client => client.id));
    }
}

async function handleMessage(message) {
    await chatDal.createMessage(message);
    const { receiver } = message;

    const user = await chatDal.readUserToId(message.sender);
    console.log(user);
    const oneMessage = {
        message: message.message,
        date: message.date,
        name: user[0].name,
        email: user[0].email,
        id: user[0]._id,
    };

    console.log(oneMessage);

    if (receiver === constants.ALL) {
        io.sockets.emit(constants.MESSAGE, oneMessage);
    } else {
        clients.map((item) => {
            if (item.userId === receiver) {
                io.sockets.connected[item.socketId].emit(constants.MESSAGE, oneMessage);
            }
        });
    }
}

app.post('/message', jsonParser, async (request, res) => {
    await handleMessage(request.body);
    
    res.status(200).send('ok');
});

app.post('/auth', urlencodedParser, async (request, res) => {
    try {
        const { emailInput, passwordInput } = request.body;

        const user = await chatDal.readUser(emailInput, passwordInput);
        res.status(200).send(user);
    } catch (e) {
        res.status(403).send('User not exist or password not correct');
    }
});

app.post('/signin', jsonParser, async (request, res) => {
    try {
        await chatDal.createUser(request.body);
        res.status(200).send('OK');
    } catch (e) {
        res.status(409).send('User with this email is already registered');
    }
});

app.get('/users', async (request, res) => {
    const users = await chatDal.readAllUsers();
    res.status(200).send(users);
});

app.get('/messages', async (request, res) => {
    const { sender, receiver, chat } = request.query;
    let users = await chatDal.readAllUsers();
    let messages = [];

    if (chat === constants.PUBLIC) {
        messages = await chatDal.readPublicMessages();
    } else if (chat === constants.PRIVATE) {
        messages = await chatDal.readPrivateMessages(sender, receiver);
    }

    res.status(200).send(chatDal.mergeMessageAndUser(messages, users));
});

