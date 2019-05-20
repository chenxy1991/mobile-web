import Vue from 'vue';
import {ApiBasePath} from '../constants/index';

export default {
      getTabIconList(params) {
        return Vue.axios.get(`../../static/datas/functionList.json`, params);
      },

    getGroupList({name, userId, province, page = 1, size = 10}) {
        const params = {
            page,
            size
        };
        name && (params.name = name);
        userId && (params.user_id = userId);
        province && (params.province = province);

        return Vue.axios.get(`${ApiBasePath}/api/group/list`, {params});
    },

    getGroupById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/group/get`, {
            params: {
                id
            }
        });
    },

    getCountById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/group/count`, {
            params: {
                id
            }
        });
    },

    updateGroupDescription(params) {
        return Vue.axios.post(`${ApiBasePath}/api/group/update/description`, params);
    },

    finishGroupByIdAndUserId(params) {
        return Vue.axios.post(`${ApiBasePath}/api/group/finish`, params);
    },

    reopenGroupByIdAndUserId(params) {
        return Vue.axios.post(`${ApiBasePath}/api/group/reopen`, params);
    },

    addGroupByBillIdAndUserId(params) {
        return Vue.axios.post(`${ApiBasePath}/api/group/add`, params);
    },

    downloadGroupByIdAndUserId(params) {
        return Vue.axios.post(`${ApiBasePath}/api/group/dowload`, params);
    },

    groupToNextStep(params) {
        return Vue.axios.post(`${ApiBasePath}/api/group/next`, params);
    },

    groupBackPreStep(params) {
        return Vue.axios.post(`${ApiBasePath}/api/group/back`, params);
    }
};
