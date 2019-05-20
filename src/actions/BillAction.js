import BillService from '../services/BillService';

/**
 * 获取订货单列表
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getBillList({commit}, params) {
    const response = await BillService.getBillList(params);
    return response.data;
}

/**
 * 获取出货单明细根据id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getDetailsByBillId({commit}, params) {
    const response = await BillService.getDetailsByBillId(params);
    return response.data;
}

/**
 * 获取出货单通过id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getBillById({commit}, params) {
    const response = await BillService.getBillById(params);
    return response.data || {};
}

/**
 * 根据分类获取团单明细
 * @param commit
 * @param params
 * @returns {Promise<*|{}>}
 */
export async function getBillDetailsById({commit}, params) {
    const response = await BillService.getBillDetailsById(params);
    return response.data;
}

/**
 * 获取珊瑚分类
 * @param {*} param0
 * @param {*} params
 */
export async function getBillShanhuDetailsById({commit}, params) {
    const response = await BillService.getBillShanhuDetailsById(params);
    return response.data;
}

/**
 * 获取珊瑚分类
 * @param {*} param0
 * @param {*} params
 */
export async function getBillUndefinedDetailsById({commit}, params) {
    const response = await BillService.getBillUndefinedDetailsById(params);
    return response.data;
}
