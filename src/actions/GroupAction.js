import GroupService from '../services/GroupService';

/**
 * 获取首页功能列表
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getTabIconList({
  commit
}, params) {
  const response = await GroupService.getTabIconList(params);
  return response.data;
}


/**
 * 获取团购列表
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getGroupList({commit}, params) {
    const response = await GroupService.getGroupList(params);
    return response.data;
}

/**
 * 获取团购通过id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getGroupById({commit}, params) {
    const response = await GroupService.getGroupById(params);
    return response.data || {};
}

/**
 * 获取已团购金额通过id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getCountById({commit}, params) {
    const response = await GroupService.getCountById(params);
    return response.data;
}

/**
 * 更新团购清单
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateGroupDescription({commit}, params) {
    const response = await GroupService.updateGroupDescription(params);
    return response.data || {};
}

/**
 * 开团人马上结束团购
 * @param commit
 * @param params
 * @returns {Promise.<void>}
 */
export async function finishGroupByIdAndUserId({commit}, params) {
    const response = await GroupService.finishGroupByIdAndUserId(params);
    return response.data;
}

/**
 * 重新开始团单
 * @param commit
 * @param params
 * @returns {Promise.<void>}
 */
export async function reopenGroupByIdAndUserId({commit}, params) {
    const response = await GroupService.reopenGroupByIdAndUserId(params);
    return response.data;
}

/**
 * 添加团购通过billId及userId
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function addGroupByBillIdAndUserId({commit}, params) {
    const response = await GroupService.addGroupByBillIdAndUserId(params);
    return response.data;
}

/**
 * 下载用户团单
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function downloadGroupByIdAndUserId({commit}, params) {
    const response = await GroupService.downloadGroupByIdAndUserId(params);
    return response.data || {};
}

/**
 * 下一步
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function groupToNextStep({commit}, params) {
    const response = await GroupService.groupToNextStep(params);
    return response.data || {};
}

/**
 * 上一步
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function groupBackPreStep({commit}, params) {
    const response = await GroupService.groupBackPreStep(params);
    return response.data || {};
}
