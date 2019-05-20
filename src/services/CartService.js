import Vue from 'vue';
import {ApiBasePath} from '../constants/index';

export default {
    getCartById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/cart/get`, {
            params: {
                id
            }
        });
    },

    getCartsByUserId({userId, page = 1, size = 10}) {
        return Vue.axios.get(`${ApiBasePath}/api/cart/list`, {
            params: {
                user_id: userId,
                page: page,
                size: size
            }
        });
    },

    getCartByGroupIdAndUserId({groupId, userId}) {
        return Vue.axios.get(`${ApiBasePath}/api/cart/get/groupId/userId`, {
            params: {
                group_bill_id: groupId,
                user_id: userId
            }
        });
    },

    getCartUnderUserByGroupId({groupId, userId}) {
        return Vue.axios.get(`${ApiBasePath}/api/cart/get/groupIdAndUserId`, {
            params: {
                group_bill_id: groupId,
                user_id: userId
            }
        });
    },

    addCart(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/add`, params);
    },

    updateCart(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/update`, params);
    },

    addDetailToCart(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/add/detail`, params);
    },

    getDetailsByCartId({cartId, page = 1, size = 1000}) {
        return Vue.axios.get(`${ApiBasePath}/api/cart/list/detail`, {
            params: {
                cart_id: cartId,
                page,
                size
            }
        });
    },

    updateCartDetail(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/update/detail`, params);
    },

    subDetailById(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/sub/detail`, params);
    },

    getCartCountById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/cart/count`, {
            params: {
                id
            }
        });
    },

    deleteDetailById(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/delete/detail`, params);
    },

    updateCartPay(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/pay/update`, params);
    },

    deleteCartById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/cart/delete`, {
            params: {
                id
            }
        });
    },

    calculateLost(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/detail/lost`, params);
    },

    calculateDamage(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/detail/damage`, params);
    },

    updateCartAndDetail(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/update/cart/detail`, params);
    },

    confirmCart(params) {
        return Vue.axios.post(`${ApiBasePath}/api/cart/confirm/update`, params);
    }
};
