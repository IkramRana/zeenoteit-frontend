import { Apis, get, post } from './';

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
    addQuote: async () => {
        let result = await post(Apis.addQuotes);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getQuotes: async () => {
        let result = await get(Apis.getQuotes);
        if (result.status === 200) return result.data;
        else throw result;
    },

}