import { Apis, get, post } from './';

var token = localStorage.getItem('jwt')

export const Service = {

    // *Auth
    login: async (obj) => {
        let result = await post(Apis.login, obj);
        if (result.status === 200) return result.data;
        else throw result;
    },
    register: async (obj) => {
        let result = await post(Apis.register, obj);
        if (result.status === 200) return result.data;
        else throw result;
    },
    verifyToken: async (token) => {
        let result = await post(Apis.verifyToken, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getPasswordResetLink: async (obj) => {
        let result = await post(Apis.getPasswordResetLink, obj);
        if (result.status === 200) return result.data;
        else throw result;
    },
    resetPassword: async (obj) => {
        let result = await post(Apis.resetPassword, obj);
        if (result.status === 200) return result.data;
        else throw result;
    },
    checkUserEmailAndPhone: async (obj) => {
        let result = await post(Apis.checkUserEmailAndPhone, obj);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Daily Quotes
    addDailyQuote: async (obj) => {
        let result = await post(Apis.addDailyQuote, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getDailyQuote: async () => {
        let result = await get(Apis.getDailyQuote, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

}