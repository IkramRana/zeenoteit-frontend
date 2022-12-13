import axios from 'axios';

// export const localServer = 'http://localhost:3000/api/'; // Local URL
// export const herokuServer = 'https://zenoteit.herokuapp.com/api/'; // Heroku Live URL
export const liveServer = 'https://app.zenoteit.com/api/'; // Live URL
// export const paymentServer = 'https://zeenoteit-server.herokuapp.com/api/'; // Live URL

const instance = axios.create({
    baseURL: liveServer,
});

export default instance;