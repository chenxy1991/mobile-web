import Vue from 'vue';
import {ApiBasePath} from '../constants/index';

export default {
    sendVerification(params) {
        return Vue.axios.post(`${ApiBasePath}/api/tools/send/verification`, params);
    },


    getCities() {
        return Vue.axios.get(`${ApiBasePath}/api/tools/citys`);
    },

    getCitiesInProvinces({area}) {
        return Vue.axios.get(`${ApiBasePath}/api/tools/citys?`, {
            params: {
                area
            }
        });
    },

    getChinaCities() {
        return Vue.axios.get(`${ApiBasePath}/api/tools/china`);
    },

    getTypes() {
        return Vue.axios.get(`${ApiBasePath}/api/users/types`);
    },

    getLocalContacts({type, province}) {
        return Vue.axios.get(`${ApiBasePath}/api/users/qq?type=${type}&province=${province}`);
    },

    checkNotice({userId, noticeId}) {
        return Vue.axios.get(`${ApiBasePath}/api/notice/check?user_id=${userId}&notice_id=${noticeId}`);
    },

    getNoticeImage() {
        return Vue.axios.get(`${ApiBasePath}/api/notice/get`);
    },

    insertNotice({userId, noticeId}) {
        return Vue.axios.get(`${ApiBasePath}/api/notice/insert?user_id=${userId}&notice_id=${noticeId}`);
    },

    getAdByProvinceCode({code}) {
        return Vue.axios.get(`${ApiBasePath}/api/tools/provinces/ad?code=${code}`);
    }
};
