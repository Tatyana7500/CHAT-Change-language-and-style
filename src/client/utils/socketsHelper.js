import constants from '../../constants';
import logic from '../components/main/logic';

export const subscribeMessages = (socket, context) => {
    socket.on(constants.MESSAGE, message => {
        if (message.name !== context.state.name && context.state.chat === constants.PUBLIC) {
            context.setState({
                messagesList: [...context.state.messagesList, message],
            });
        }
    });
};

export const subscribePrivateMessages = (socket, context) => {
    socket.on(constants.MESSAGEPRIVATE, (message) => {
        if (message.name !== context.state.name && context.state.chat === constants.PRIVATE && message.id === context.state.idUserReceiver) {
            context.setState({
                messagesList: [...context.state.messagesList, message],
            });
        }
    });
};

export const subscribeOnline = (socket, context) => {
    socket.on(constants.ONLINE, online => {
        context.setState(state => ({
            ...state,
            usersOnline: online,
        }));
    });

    socket.emit(constants.ONLINE, JSON.parse(logic.getLocalStorage())._id);
};

export const subscribeSocket = (socket, context) => {
    subscribeMessages(socket, context);
    subscribeOnline(socket, context);
    subscribePrivateMessages(socket, context);
};

export default {
    subscribeSocket,
}