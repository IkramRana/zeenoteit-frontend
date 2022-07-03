import io from 'socket.io-client';

export const socketConfig = () => {

    // const socket = io("ws://localhost:3001", 
    // //const socket = io("ws://app.zenoteit.com/notification-service",
    // {
    //     rejectUnauthorized: false,
    //     reconnection: true
    // });

    var socket = io('https://dev.octagon.com:8443', {path: '/octagon/socket.io'})

    return socket;
}