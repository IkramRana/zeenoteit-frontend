import io from 'socket.io-client';

export const socketConfig = () => {

    //const socket = io("ws://localhost:3018",
    const socket = io("ws://app.zenoteit.com/notification-service",
    {
        rejectUnauthorized: false,
        reconnection: true
    });

    return socket;
}