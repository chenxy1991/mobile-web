import Vue from 'vue';
import {ApiBasePath} from '../constants/index';

export default {
    getCategories() {
        return Vue.axios.get(`${ApiBasePath}/api/material/category`);
    },

    getTypesByCategoryCode({categoryCode}) {
        return Vue.axios.get(`${ApiBasePath}/api/material/types`, {
            params: {
                pc: categoryCode
            }
        });
    },

    getCompatibilities() {
        return Vue.axios.get(`${ApiBasePath}/api/material/compatibility`);
    },

    getLevels() {
        return Vue.axios.get(`${ApiBasePath}/api/material/level`);
    },

    getEncyById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/material/get`, {
            params: {
                id
            }
        });
    },

    getEncyList({name, type, userId, category, page = 1, size = 10}) {
        const params = {page, size};
        name && (params.name = name);
        type && (params.type = type);
        userId && (params.user_id = userId);
        category && (params.category = category);

        return Vue.axios.get(`${ApiBasePath}/api/material/list`, {params});
    },

    getFocusedEncyList({userId}) {
        return Vue.axios.get(`${ApiBasePath}/api/material/focus/list`, {
            params: {
                user_id: userId
            }
        });
    },

    getEncyRandomList({number, userId}) {
        const params = {number};
        userId && (params.user_id = userId);

        return Vue.axios.get(`${ApiBasePath}/api/material/random/list`, {
            params
        });
    },

    getImagesByEncyId({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/material/imageList`, {
            params: {id}
        });
    },

    getEncyRandomImage() {
        return Vue.axios.get(`${ApiBasePath}/api/material/random/image`);
    },

    getEncyImageById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/material/image`, {
            params: {id}
        });
    },

    getEncyImagesById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/material/imageList`, {
            params: {id}
        });
    },

    getSmallEncyImageById({id}) {
        return Vue.axios.get(`${ApiBasePath}/api/material/image/base64/small?id=${id}`);
    },

    focusEncy({user_id, material_id}) {
        return Vue.axios.get(`${ApiBasePath}/api/material/focus`, {
            params: {
                user_id,
                material_id
            }
        });
    }
};
