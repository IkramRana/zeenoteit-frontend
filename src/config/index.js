import Axios from '../axios';
import { errorHandler } from './errorHandler';

export const Apis = {
    // *Auth
    login: 'user/login',
    register: 'user/register',
    verifyToken: 'user/verifyToken',
    resetPassword: 'password-reset/resetPassword',
    getPasswordResetLink: 'password-reset/getPasswordResetLink',
    checkUserEmailAndPhone: 'user/checkUserEmailAndPhone',

    // *Daily Quotes
    addQuotes: 'quote/add-quote',
    getQuotes: 'quote/get-quote',
};

export const headers = {
    'content-type': 'application/json',
};

export const get = async (data, token) => {
    try {
        const result = await Axios.get(data, { headers: { Authorization: `Bearer ${token}` } });
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const post = async (endPoint, data, token) => {
    try {
        const result = await Axios.post(endPoint, data, { headers: { Authorization: `Bearer ${token}` } });
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const put = async (endPoint, data, token) => {
    try {
        const result = await Axios.put(endPoint, data, { headers: { Authorization: `Bearer ${token}` } });
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};