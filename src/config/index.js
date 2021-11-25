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

    // *User Notification
    getUserNotifications: 'notification/user-notifications',

    // *Daily Quotes
    getDailyQuote: 'quote/get-quote',

    // *Task
    addTask: 'task/add-task',
    addSubTask: 'subtask/add-subtask',
    getUserTask: 'task/user-tasks',
    getUserSubTaskByTaskId: 'subtask/subtask-by-task-id',
    editTask: 'task/update-title',
    completeSubTask: 'subtask/complete-subtask',
    deleteTask: 'task/delete-task',
    swapTask: 'task/swap-task',
    swapSubTask: 'subtask/swap-subtask',

    // *Thought
    addThought: 'thought/add-thought',
    getThought: 'thought/get-thought',
    getThoughtByThoughtId: 'thought/get-thought-by',
    editThought: 'thought/update-thought',
    deleteThought: 'thought/delete-thought',

    // *Setting
    updateSetting: 'app-settings/updateSetting',
    deleteAccount: 'user/deactivateAccount',

    // *Colors
    getColors: 'color/get-colors',
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

export const patch = async (endPoint, data, token) => {
    try {
        const result = await Axios.patch(endPoint, data, { headers: { Authorization: `Bearer ${token}` } });
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const deleted = async (endPoint, data, token) => {
    try {
        const result = await Axios.delete(endPoint, { headers: { Authorization: `Bearer ${token}` }, data: data });
        return result;
    } catch (e) {
        throw errorHandler(e);
    }
};