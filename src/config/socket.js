import io from 'socket.io-client';

export const socketConfig = () => {

    //const socket = io("ws://localhost:3019",
    const socket = io("wss://zeenoteit.herokuapp.com:3019",
    {
        rejectUnauthorized: false,
        reconnection: true
    });

    return socket;
}