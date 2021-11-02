import axios from 'axios';

export const localServer = 'http://localhost:3000/api/'; // local url

const instance = axios.create({
    baseURL: localServer,
});

export default instance;