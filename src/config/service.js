import { Apis, get, post } from './';

export const Service = {

    // *Auth
    register: async (obj) => {
        let result = await post(Apis.register, obj);
        if (result.status === 200) return result.data;
        else throw result;
    },

    // *Countries
    getCountries: async () => {
        let result = await get(`${Apis.countries}`);
        if (result.status === 200) return result.data;
        else throw result;
    },

}