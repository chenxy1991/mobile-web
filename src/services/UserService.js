import Vue from 'vue';
import {ApiBasePath} from '../constants/index';

export default {
    register(params = {}) {
        return Vue.axios.post(`${ApiBasePath}/api/users/register`, params);
    },

   /*  login(params = {}) {
        return Vue.axios.post(`${ApiBasePath}/api/users/login`, params);
    }, */
     login(params = {}) {
        return Vue.axios.post(`${ApiBasePath}/api/account/login`, params);
    },
    tokenKey(params = {}) {
      return Vue.axios.get(`${ApiBasePath}/api/account/login?tokenKey=get`, params);
    },
    logout(params) {
        return Vue.axios.post(`${ApiBasePath}/api/user/exit`, params);
    },


    getUserList({name, province, type1, type2, page = 1, size = 10}) {
        const params = {page, size};
        name && (params.name = name);
        province && (params.province = province);
        type1 && (params.type1 = type1);
        type2 && (params.type2 = type2);

        return Vue.axios.get(`${ApiBasePath}/api/users/list`, {params});
    },

    getUserById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/users/get`, {
            params: {
                id
            }
        });
    },

    getUserAvatar({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/users/get/logo`, {
            params: {
                id
            }
        });
    },

    uploadUserAvatar(formData) {
        return Vue.axios.post(`${ApiBasePath}/api/users/upload`, formData);
    },

    uploadPayQrCode(formData) {
        return Vue.axios.post(`${ApiBasePath}/api/users/upload/pay`, formData);
    },

    updateUser(params) {
        return Vue.axios.post(`${ApiBasePath}/api/users/update`, params);
    },

    checkUsername({name}) {
        return Vue.axios.get(`${ApiBasePath}/api/users/checkName`, {
            params: {
                name
            }
        });
    },

    hasBindPhone({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/users/checkPhone`, {
            params: {
                id
            }
        });
    },

    bindPhone(params) {
        return Vue.axios.post(`${ApiBasePath}/api/users/save/phone`, params);
    }
};
