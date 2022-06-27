import io from 'socket.io-client';

export const socketConfig = () => {

    //const socket = io("ws://localhost:3018",
    const socket = io("wss://app.zeenoteit.com/notification-service:3018",
    {
        rejectUnauthorized: false,
        reconnection: true
    });

    return socket;
}