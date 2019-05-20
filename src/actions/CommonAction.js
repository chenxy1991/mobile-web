import * as TYPES from '../constants/types';
import CommonService from '../services/CommonService';


/**
 * 发送短信验证码
 * @param commit
 * @param params
 * @returns {Promise.<void>}
 */
export async function sendVerification({commit}, params) {
    const response = await CommonService.sendVerification(params);
    return response.data;
}


/**
 * 获取城市
 * @returns {Promise<Array>}
 */
export async function getCities () {
    const citiesObj = await CommonService.getCities();
    const citiesArr = [];

    for (let key of Reflect.ownKeys(citiesObj.data)) {
        citiesArr.push({
            key,
            value: citiesObj.data[key]
        });
    }

    return citiesArr;
}

/**
 * 获取某个省份的所有城市
 * @param commit
 * @param params
 * @returns {Promise.<Array>}
 */
export async function getCitiesInProvinces({commit}, params) {
    const citiesObj = await CommonService.getCitiesInProvinces(params);
    const citiesArr = [];

    for (let item of citiesObj.data.res) {
        citiesArr.push({
            name: item.mark,
            value: item.name
        });
    }

    return citiesArr;
}

export async function getChinaCities({commit}) {
    const response = await CommonService.getChinaCities();
    return response.data;
}

export async function getTypes() {
    const response = await CommonService.getTypes();
    return response.data || {};
}

export async function getMe() {
    const response = await CommonService.getMe();
    return response.data || {};
}

export function loadingShow({commit}, loadingShow) {
    commit(TYPES.LOADING, loadingShow);
}


/**
 * 获取本地QQ群
 * @param commit
 * @param params
 * @returns {Promise.<Array>}
 */
export async function getLocalContacts({commit}, params) {
    const response = await CommonService.getLocalContacts(params);
    return response.data || [];
}

/**
 * 是否弹公告
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function checkNotice({commit}, params) {
    const response = await CommonService.checkNotice(params);
    return response.data;
}

/**
 * 获取公告
 * @param commit
 * @returns {Promise<*>}
 */
export async function getNoticeImage({commit}) {
    const response = await CommonService.getNoticeImage();
    return response.data;
}

/**
 * 更新是否阅读公告
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function insertNotice({commit}, params) {
    const response = await CommonService.insertNotice(params);
    return response.data;
}

/**
 * 获取广告
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function getAdByProvinceCode({commit}, params) {
    const response = await CommonService.getAdByProvinceCode(params);
    return response.data;
}
