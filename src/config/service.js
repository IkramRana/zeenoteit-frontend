import { Apis, get, post, patch, deleted } from './';

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

    // *User Notifications
    getUserNotification: async (token) => {
        let result = await get(Apis.getUserNotifications, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Daily Quotes
    getDailyQuote: async (token) => {
        let result = await get(Apis.getDailyQuote, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Tasks
    addTask: async (obj, token) => {
        let result = await post(Apis.addTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    addSubTask: async (obj, token) => {
        let result = await post(Apis.addSubTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getUserTask: async (token) => {
        let result = await get(Apis.getUserTask, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getUserSubTaskByTaskId: async (taskId, token) => {
        let result = await get(`${Apis.getUserSubTaskByTaskId}?id=${taskId}`, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    editTask: async (obj, token) => {
        let result = await patch(Apis.editTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    checkUncheckSubtask: async (obj, token) => {
        let result = await patch(Apis.checkUncheckSubtask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    deleteTask: async (obj, token) => {
        let result = await deleted(Apis.deleteTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    swapTask: async (obj, token) => {
        let result = await patch(Apis.swapTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    swapSubTask: async (obj, token) => {
        let result = await patch(Apis.swapSubTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    deleteSubTask: async (obj, token) => {
        let result = await deleted(Apis.deleteSubTask, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Thoughts
    addThought: async (obj, token) => {
        let result = await post(Apis.addThought, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getThought: async (token) => {
        let result = await get(Apis.getThought, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    getThoughtByThoughtId: async (id, token) => {
        let result = await get(Apis.getThoughtByThoughtId + '?id=' + id, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    editThought: async (obj, token) => {
        let result = await patch(Apis.editThought, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    deleteThought: async (obj, token) => {
        let result = await deleted(Apis.deleteThought, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Setting
    updateSetting: async (obj, token) => {
        let result = await patch(Apis.updateSetting, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    deleteAccount: async (obj, token) => {
        let result = await patch(Apis.deleteAccount, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Colors
    getColors: async (token) => {
        let result = await get(Apis.getColors, token);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Stripe
    getSecretKey: async (token) => {
        let result = await get(Apis.getSecretKey, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    subscription: async (obj, token) => {
        let result = await post(Apis.subscription, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
    freeTrial: async (obj, token) => {
        let result = await post(Apis.freeTrial, obj, token);
        if (result.status === 200) return result.data;
        else throw result;
    },
}