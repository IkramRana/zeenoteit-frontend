import { Apis, get, post, patch, deleted } from './';

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

    // *Tasks
    addTask: async (obj) => {
        let result = await post(Apis.addTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    addSubTask: async (obj) => {
        let result = await post(Apis.addSubTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getUserTask: async () => {
        let result = await get(Apis.getUserTask, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    editTask: async (obj) => {
        let result = await patch(Apis.editTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    completeSubTask: async (obj) => {
        let result = await patch(Apis.completeSubTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    deleteTask: async (obj) => {
        let result = await deleted(Apis.deleteTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Thoughts
    addThought: async (obj) => {
        let result = await post(Apis.addThought, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getThought: async () => {
        let result = await get(Apis.getThought, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getThoughtByThoughtId: async (id) => {
        let result = await get(Apis.getThoughtByThoughtId + '?id=' + id, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    editThought: async (obj) => {
        let result = await patch(Apis.editThought, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    deleteThought: async (obj) => {
        let result = await deleted(Apis.deleteThought, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Setting
    updateSetting: async (obj) => {
        let result = await patch(Apis.updateSetting, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    deleteAccount: async (obj) => {
        let result = await deleted(Apis.deleteAccount, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Colors
    getColors: async () => {
        let result = await get(Apis.getColors, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
}