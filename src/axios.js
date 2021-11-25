import axios from 'axios';

export const localServer = 'http://localhost:3000/api/'; // Local URL
export const herokuServer = 'https://zeenoteit.herokuapp.com/api/'; // Live URL

const instance = axios.create({
    baseURL: herokuServer,
});

export default instance;