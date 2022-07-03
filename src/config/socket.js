import io from 'socket.io-client';

export const socketConfig = () => {

    // const socket = io("ws://localhost:3001", 
    // //const socket = io("ws://app.zenoteit.com/notification-service",
    // {
    //     rejectUnauthorized: false,
    //     reconnection: true
    // });

    var socket = io('http://app.zenoteit.com', {path: '/notification-service/socket.io'})

    return socket;
}