import axios from 'axios';

export const localServer = 'http://localhost:3000/api/'; // local url
export const herokuServer = 'https://zeenoteit.herokuapp.com/api/'; // local url

const instance = axios.create({
    baseURL: herokuServer,
});

export default instance;